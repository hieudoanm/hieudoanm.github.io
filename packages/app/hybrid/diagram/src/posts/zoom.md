---
title: Zoom — Video Conferencing
difficulty: medium
category: communication
author: Hieu Doan
tags: realtime, video, web-conferencing
---

# Zoom — Video Conferencing

WebRTC realtime media, SFU routing, rooms, screen share, recording.

## Interview Questions

- Design Zoom / a video conferencing service
- How do you route realtime audio/video with low latency (WebRTC / SFU)?
- How do you support large meetings with many participants?
- Design screen sharing and recording
- How do you handle poor network conditions in a video call?

## Answers

### Q1. Design Zoom / a video conferencing service

Zoom is a realtime media system split into a control plane and a media plane.
The control plane — signaling server, auth, room service — runs over WebSockets
and handles SDP offers/answers, ICE candidate exchange, room membership, and
lifecycle. Auth issues short-lived tokens bound to the meeting ID and
participant role (host, co-host, guest); the Room Service persists meeting
metadata — host, start time, settings, password, recording flag — to a Meeting
DB and maintains live participant state in a Session Cache.

The media plane is WebRTC over UDP: each client publishes its audio and video
tracks to an SFU media router, which selectively forwards them to every other
participant. Because media never touches the DB, the control plane stays cheap
even in huge calls. Recordings subscribe to the SFU streams, and a Media Relay
bridges SFU regions so a meeting spread across continents stays low-latency.

Data models stay small: a `meetings` row (id, host, settings, status), a
`participants` association (meeting, user, joined_at), a `sessions` table
mapping connection IDs to participants, and recording metadata referencing
object-storage archives. The session cache holds ephemeral signaling state — who
has joined, which SFU they're on — so a signaling node restart doesn't drop
meetings.

Trade-offs start with topology: mesh is O(n²) and dies beyond ~10 participants,
MCU mixing saves bandwidth but burns CPU and adds latency, and an SFU forwards
streams unchanged — O(n) at the SFU and the flexible choice. Scaling is
regional: meetings land on an SFU cluster near their host, and cross-region
calls bridge through relays. Failure handling means participants rejoin and
renegotiate after an SFU node dies, and signaling state is reconstructable from
the session cache.

### Q2. How do you route realtime audio/video with low latency (WebRTC / SFU)?

Media routing is the heart. Signaling uses WebRTC's SDP offer/answer over the
signaling server, then ICE (STUN/TURN) punches through NATs; once the
peer-to-peer path is established, RTP streams flow over UDP directly between the
client and an SFU. STUN discovers the public address; TURN relays when UDP is
blocked, at the cost of an extra hop and bandwidth. The SFU receives each
publisher's stream once and forwards copies to subscribers — O(n) total streams
per meeting instead of mesh's O(n²). The mouth-to-ear budget is typically under
200–400ms.

Low latency is bought with UDP, small RTP packetization, and jitter buffers
sized for the tail, not the average. Simulcast lets a publisher send multiple
quality layers; the SFU forwards the layer matching each subscriber's bandwidth,
so a laptop on WiFi gets 360p while a conference room gets 1080p, all without
renegotiation.

Congestion control runs continuously on both ends: the client estimates
available bandwidth from packet arrival (Google Congestion Control), the SFU
reports receiver-side estimates, and both adapt send rates within the latency
budget. Keyframes and FEC are tuned per stream so a single lost packet doesn't
freeze a participant's video.

Regions matter: each region runs an SFU farm, and a Media Relay forwards
compressed streams between farms with regional loss recovery, so a Tokyo–San
Francisco call never hops a single congested path. Scaling is horizontal —
meetings are pinned to one SFU cluster and clusters scale by adding nodes, with
the signaling tier scaling independently. Failure handling routes around dead
SFUs by renegotiating sessions, and TURN relays cover symmetric NATs.

### Q3. How do you support large meetings with many participants?

Mesh dies past a handful of participants, so large meetings lean on the SFU's
selective forwarding. Rather than sending every participant's full video to
everyone, the SFU detects active speakers — via audio energy or the publisher's
own signaling — and forwards only active speakers at full quality while others
drop to low quality or audio-only. The client renders an active-speaker view
instead of a wall of video, which is both the UX and the bandwidth win.

Beyond a few hundred, a single SFU isn't enough. The standard design is an SFU
hierarchy: a primary SFU fans out to sub-SFU nodes, each serving a subgroup; an
audio mixer (or RMC-style router) centrally mixes audio so each subgroup
receives one composite audio stream, collapsing O(n²) audio to O(n). Video still
flows selectively, and breakout rooms run on separate clusters.

Large meetings reserve capacity up front — a host scheduling a webinar gets a
cluster pinned at start time rather than racing for shared capacity at join
time. Signaling scales horizontally because join/leave is bursty at meeting
start, and the room service pre-allocates slots. Layouts (grid, spotlight,
gallery) are metadata pushed to clients; the SFU only forwards the streams those
layouts need.

Trade-offs are capacity versus fidelity: forwarding only active speakers saves
bandwidth but needs speaker detection to be fast, and MCU audio mixing saves
bandwidth but is compute-heavy and adds a few milliseconds. Failure handling
covers a host dropping (host transfer), and rejoin after a network blip resumes
the same meeting state from the session cache.

### Q4. Design screen sharing and recording

Screen sharing is just another WebRTC video track: the client captures the
display, encodes it (VP8/VP9/H.264, often AV1 at high resolution) as a
low-motion stream, and publishes it to the SFU alongside the camera track. The
client renders the presenter's screen as a separate surface with the presenter's
camera overlaid — composition happens on the viewer, keeping the SFU simple.
Annotation and touch work client-side on the captured stream.

Recording lives in the media plane. A recorder joins the meeting as a subscriber
that consumes the SFU's streams and writes segments to object storage; for
layouts that mirror what viewers saw, a composite (MCU-style) stage mixes the
screen, active speaker, and captions into one video. Each segment carries a
sequence number so reassembly tolerates a dropped segment.

Post-processing runs asynchronously: stitching segments, adding captions via
ASR, generating transcripts and thumbnails, then publishing the recording with a
manifest. Transcripts feed search, so a recording is discoverable by spoken
content, and captions are re-synced to the stitched timeline. Recording is
encrypted at rest and playback is gated by the same meeting-token mechanism as
live, so a recording link can't be shared indefinitely.

The trade-off is flexibility versus cost: per-participant recording keeps every
source separate and supports arbitrary playback layouts but multiplies storage
and encode cost; composite recording is cheap and deterministic but fixed at
record time. Failure handling writes segments with continuity and assembles a
manifest at the end, so a mid-call outage loses only the gap. Retention and GDPR
controls govern storage, and latency stays additive because recording subscribes
to what viewers already receive.

### Q5. How do you handle poor network conditions in a video call?

Network adaptation is per-subscriber and continuous. The client runs congestion
control (Google Congestion Control / REMB) estimating bandwidth from arrival
rates, and tells the SFU which simulcast layer it can afford; when congestion
hits, the SFU downgrades to a lower layer, then to audio-only, then to audio
with reduced bitrate. The jitter buffer grows and shrinks to hide variance, and
DTX (silence detection) stops sending audio packets during silence to reclaim
bandwidth.

Resilience is layered on top: audio gets FEC (RED) so a few lost packets
reconstruct seamlessly; NACK/RTX retransmits lost video packets up to a latency
budget, and a keyframe request repairs a broken video stream instead of waiting
for the next I-frame. Audio is always prioritized over video, and the SFU
applies the same adaptation when a subscriber's link degrades.

Adaptation is multi-dimensional: resolution drops first, then frame rate, then
codec complexity — low-motion scenes tolerate frame-rate cuts that would ruin a
full-motion share. The client also adapts locally, e.g., muting the camera when
UDP is blocked behind a strict firewall while keeping audio on a TURN relay.

The trade-offs are explicit: more FEC and retransmission eat bandwidth and
latency, so you spend just enough to keep the call alive and degrade quality
rather than stall. The system monitors per-participant metrics — packet loss,
jitter, round-trip time, frames-per-second — so the client can auto-mute video
for a weak subscriber and surface a "poor connection" hint. Scaling is about not
coupling adaptation decisions: each subscriber adapts independently, so a single
weak link never drags down the meeting.

## Source

```text
title: Zoom Video Conferencing
node client: Client [round, icon=browser]
node signal: Signaling Server [icon=server]
node auth: Auth Service [icon=auth]
node room: Room Service [icon=message]
node sfu: SFU Media Router [icon=compute]
node relay: Media Relay [ellipse, icon=cloud]
node screen: Screen Share [icon=file]
node record: Recording [icon=file]
node notify: Notifications [icon=mail]
node db: Meeting DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> auth: login
edge auth -> signal: token
edge client -> signal: join room
edge signal -> room: create / join
edge room -> db: persist
edge client -> sfu: publish media
edge sfu -> client: forward streams
edge sfu -> relay: bridge cross-region
edge client -> screen: share
edge screen -> sfu: video track
edge room -> record: archive
edge room -> notify: status
edge signal -> cache: session
```
