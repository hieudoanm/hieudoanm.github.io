---
title: 'WebSocket'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'WebSocket'
---

### Basic

WebSocket is a communications protocol that allows for a constant flow of data over a single TCP connection. In this way, web applications may enjoy real-time communications between a client and a server. Before we go further, let's break for a few definitions:

`Client` - The Client refers to whatever application you have open on your device (such as your favorite video game, trading app, or social media feed).

`Server` - A server simply means a remote computer that stores the data that you want to receive or send.

`TCP` - A Transmission Control Protocol (TCP) allows messages between Internet devices within a network to communicate with each other. Most of the web applications that we are most familiar with today, such as browsers and emails, depend on TCP as part of the Internet's communication transport layer.

`UDP` - User Datagram Protocol is a communication protocol used across the Internet for especially time-sensitive transmissions such as video playback or DNS lookups.

`TCP` vs `UDP`

| Parameter               | TCP                                                                                                                                                                       | UDP                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Definition              | TCP is a communication-based protocol. One can use it for the transmission of data over the network between systems. The data transmission occurs in the form of packets. | UDP is similar to the TCP protocol. But it does not guarantee data recovery and error-checking services.                                                                |
|                         | TCP includes error-checking techniques, guarantees data delivery, and maintains the order of data and information packets.                                                | If a user deploys this protocol, the data will get continuously sent, irrespective of any issues with the receiver.                                                     |
| Design                  | This protocol is connection-oriented.                                                                                                                                     | This protocol is connectionless.                                                                                                                                        |
| Transmission of Data    | Data transmission in TCP occurs in a particular sequence. It means that the data packets arrive in the intended order at the receiver's end.                              | Sequencing of data does not occur in the case of UDP. It means that a user can implement ordering only by managing it by the application layer.                         |
| Speed                   | TCP is comparatively slower than UDP.                                                                                                                                     | UDP is faster as compared to TCP.                                                                                                                                       |
| Efficiency              | TCP is less efficient as compared to UDP.                                                                                                                                 | UDP is more efficient as compared to TCP.                                                                                                                               |
| Retransmission          | It is possible to retransmit data in TCP- just in case any packet is lost in the way, and a user needs to resend it.                                                      | It is not possible to retransmit data packets in UDP in the same way TCP does.                                                                                          |
| Status of Connection    | TCP requires a very established connection for data transmission. One needs to close the connection once the transmission of data is complete.                            | UCP is a connectionless protocol. So it doesn't require overhead to open, maintain, or terminate a connection.                                                          |
| Guarantee of Delivery   | TCP guarantees data delivery to the destination receiver/router.                                                                                                          | UDP does not offer any guarantee regarding data delivery to the destination receiver/router.                                                                            |
| Sequencing of Data      | TCP is capable of sequencing data. It rearranges the data packets in a specific order.                                                                                    | UDP is incapable of sequencing data. It has no fixed order, and all the packets remain independent of each other.                                                       |
| Size of Header          | The size of a Header in TCP is 20 bytes.                                                                                                                                  | The size of a Header in UDP is 8 bytes.                                                                                                                                 |
| Checking of Errors      | It offers an extensive acknowledgment of data and error checking.                                                                                                         | It follows basic mechanisms of data checking like checksums.                                                                                                            |
| Broadcasting            | TCP does not support broadcasting.                                                                                                                                        | UDP supports broadcasting.                                                                                                                                              |
| Transferring Method     | TCP reads data using the byte system. Every message transmits to the segment boundaries.                                                                                  | UDP packets have defined boundaries. It sends every packet individually and checks for the integrity of data on its arrival.                                            |
| Reliability             | TCP guarantees data delivery to the destination route and offers support for error checking. Thus, it is more reliable as compared to the UDP protocol.                   | UDP offers support for only basic error checking using the checksum data blocks. It also doesn't guarantee data delivery to the destination as compared to that of TCP. |
| Optimal Use             | Mostly HTTP, HTTPS, POP, SMTP, FTP, etc., utilize the TCP protocol.                                                                                                       | Mostly DNS, VoIP, media streaming, video conferencing systems, etc., utilize the UDP protocol.                                                                          |
| Weight                  | The TCP protocol is heavy-weight. It needs a total of three data packets for the setting up of a socket connection prior to sending any user data.                        | The UDP protocol is lightweight. No ordering of messages, tracking connections, etc., are present.                                                                      |
| Acknowledgment segments | TCP has Acknowledgement segments.                                                                                                                                         | UDP does not have any Acknowledgement segments.                                                                                                                         |
| Handshake Protocol      | TCP uses a handshake protocol for establishing connections like SYN-ACK, SYN, ACK, etc.                                                                                   | UDP uses no handshake protocol since it is connectionless.                                                                                                              |

WebSockets allow for a continuous line of communication between the client and server until that line is closed. As a result, it can remain open for back and forth, bi-directional communications.

### WebSockets vs. HTTP

HTTP is the request-response model that you'd see in a search for information. The connection opens to send the request for information. It then closes as soon as the server sends the response back. What WebSockets do is essentially extend the conversation between the client and a server.

WebSocket:

- Bi-directional
- Connection is alive until terminated by the client
- Real time data is received on one single connection and updated constantly
- Collaborations (Google Docs), Location-based apps, Multiplayer games, MultiMedia Chats, Financial applications

HTTP:

- Unidirectional communication
- Connection is terminated after request/response
- HTTP data is use with a simple restful API
- Browser Serach, Email, Notifications

### Socket.io

- Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. It consists of:
- The client will try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not.

### Server-Sent Events

A server-sent event is when a web page automatically gets updates from a server.

This was also possible before, but the web page would have to ask if any updates were available. With server-sent events, the updates come automatically.

Examples: Facebook/Twitter Updates, Stock Price Updates, News Feeds, Sport Results, etc.
