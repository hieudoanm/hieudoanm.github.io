package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/** A grid of feature cards. */
@Serializable
data class Features(
    val heading: String = "",
    val sub: String = "",
    val items: List<Feature> = emptyList(),
)

/** A single card with an emoji icon. */
@Serializable
data class Feature(
    val icon: String = "",
    val title: String = "",
    val body: String = "",
)

/** A video walkthrough rendered in a 16:9 frame. */
@Serializable
data class Demo(
    val heading: String = "",
    val sub: String = "",
    val video: Video = Video(),
)

/**
 * The demo video; [poster] is optional, [track] points to a WebVTT file.
 */
@Serializable
data class Video(
    val src: String = "",
    val poster: String = "",
    val track: String = "",
)

/** The closing call to action. */
@Serializable
data class Cta(
    val icon: String = "",
    val heading: String = "",
    val body: String = "",
    val button: Button = Button(),
)
