package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class WebCommandTest {
    @Test
    fun testWebWeather() {
        val cmd = WebCommand()
        val result = cmd.test("weather London")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testYoutubeThumbnailsList() {
        val cmd = WebCommand()
        val result = cmd.test("youtube thumbnails --url dQw4w9WgXcQ --list")
        assertEquals(0, result.statusCode)
        assertContains(result.output, "Video ID: dQw4w9WgXcQ")
        assertContains(result.output, "maxresdefault")
    }

    @Test
    fun testYoutubeThumbnailsListJson() {
        val cmd = WebCommand()
        val result = cmd.test("youtube thumbnails --url dQw4w9WgXcQ --list --json")
        assertEquals(0, result.statusCode)
        assertContains(result.output, "video_id")
    }

    @Test
    fun testYoutubeThumbnailsFullUrl() {
        val cmd = WebCommand()
        val result = cmd.test("youtube thumbnails --url \"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" --list")
        assertEquals(0, result.statusCode)
        assertContains(result.output, "Video ID: dQw4w9WgXcQ")
    }

    @Test
    fun testYoutubeThumbnailsShortUrl() {
        val cmd = WebCommand()
        val result = cmd.test("youtube thumbnails --url \"https://youtu.be/dQw4w9WgXcQ\" --list")
        assertEquals(0, result.statusCode)
        assertContains(result.output, "Video ID: dQw4w9WgXcQ")
    }

    @Test
    fun testYoutubeThumbnailsQualityInvalid() {
        val cmd = WebCommand()
        assertFailsWith<IllegalArgumentException> {
            cmd.test("youtube thumbnails --url dQw4w9WgXcQ --quality invalid")
        }
    }

    @Test
    fun testYoutubeFetchHelp() {
        val cmd = WebCommand()
        val result = cmd.test("youtube fetch --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testWebWeatherJson() {
        val cmd = WebCommand()
        val result = cmd.test("weather London --json")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testWebWeatherForecast() {
        val cmd = WebCommand()
        val result = cmd.test("weather London --forecast")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testYtQualityDataClass() {
        // YtQuality is private so we test it indirectly through the thumbnail listing
        val cmd = WebCommand()
        val result = cmd.test("youtube thumbnails --url dQw4w9WgXcQ --list --json")
        assertEquals(0, result.statusCode)
        assertContains(result.output, "maxresdefault")
        assertContains(result.output, "1280x720")
    }
}
