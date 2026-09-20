package io.github.hieudoanm.landify.config

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/** Waitlist page data: an email capture panel with a launch date. */
@Serializable
data class Waitlist(
    val launches: String = "",
    val heading: String = "",
    val body: String = "",
    val form: Form = Form(),
    val social: List<NavItem> = emptyList(),
)

/** The email capture form of a waitlist page. */
@Serializable
data class Form(
    val action: String = "",
    val placeholder: String = "",
    val button: String = "",
)

/** Event page data: a date and venue strip, an agenda, and a speaker grid. */
@Serializable
data class Event(
    val date: String = "",
    val time: String = "",
    val venue: EventVenue = EventVenue(),
    val primary: Button = Button(),
    @SerialName("speakers_heading") val speakersHeading: String = "",
    @SerialName("speakers_sub") val speakersSub: String = "",
    val agenda: List<AgendaItem> = emptyList(),
    val speakers: List<Speaker> = emptyList(),
)

/** The location shown in the event meta strip. */
@Serializable
data class EventVenue(
    val name: String = "",
    val city: String = "",
    val address: String = "",
)

/** A single timed slot in the event agenda. */
@Serializable
data class AgendaItem(
    val time: String = "",
    val title: String = "",
    val body: String = "",
    val speaker: String = "",
)

/** A person card in the event speaker grid. */
@Serializable
data class Speaker(
    val name: String = "",
    val role: String = "",
    val avatar: String = "",
)
