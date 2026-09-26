package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/** Portfolio page data: an avatar, skills chips, and a project grid. */
@Serializable
data class Portfolio(
    val name: String = "",
    val role: String = "",
    val location: String = "",
    val avatar: String = "",
    val about: String = "",
    val skills: List<String> = emptyList(),
    val projects: List<Project> = emptyList(),
)

/** A card in a portfolio project grid. */
@Serializable
data class Project(
    val icon: String = "",
    val title: String = "",
    val body: String = "",
    val href: String = "",
)

/** Docs page data: topic card links and an optional code sample. */
@Serializable
data class Docs(
    val heading: String = "",
    val sub: String = "",
    val sample: String = "",
    val packages: List<DocCard> = emptyList(),
)

/** A linked topic card on a docs landing page. */
@Serializable
data class DocCard(
    val icon: String = "",
    val title: String = "",
    val body: String = "",
    val href: String = "",
)
