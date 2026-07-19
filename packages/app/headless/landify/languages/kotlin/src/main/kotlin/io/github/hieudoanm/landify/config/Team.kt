package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/** FAQ page data, rendered with native `<details>` so it needs no JavaScript. */
@Serializable
data class Faq(
    val heading: String = "",
    val sub: String = "",
    val items: List<FaqItem> = emptyList(),
)

/** A single question with its answer. */
@Serializable
data class FaqItem(
    val question: String = "",
    val answer: String = "",
)

/** Team page data: an optional values strip above a grid of member cards. */
@Serializable
data class Team(
    val heading: String = "",
    val sub: String = "",
    val values: List<TeamValue> = emptyList(),
    val members: List<TeamMember> = emptyList(),
)

/** One principle card in a team values strip. */
@Serializable
data class TeamValue(
    val icon: String = "",
    val title: String = "",
    val body: String = "",
)

/** One person card on a team page. */
@Serializable
data class TeamMember(
    val name: String = "",
    val role: String = "",
    val bio: String = "",
    val avatar: String = "",
)
