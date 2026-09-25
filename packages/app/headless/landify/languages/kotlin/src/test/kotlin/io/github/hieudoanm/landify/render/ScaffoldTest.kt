package io.github.hieudoanm.landify.render

import io.github.hieudoanm.landify.config.loadYamlFile
import io.github.hieudoanm.landify.validate.errors
import io.github.hieudoanm.landify.validate.knownTypes
import io.github.hieudoanm.landify.validate.normalizeType
import java.nio.file.Files
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class ScaffoldTest {
    @Test
    fun `every scaffold is legal, so a new file never starts invalid`() {
        for (type in knownTypes()) {
            val path = Files.createTempFile("landify-$type", ".yaml")
            try {
                writePlaceholder(path, type)
                val config = loadYamlFile(path)
                assertEquals(type, normalizeType(config.pageType), "$type scaffold type")
                val problems = errors(config)
                assertTrue(problems.isEmpty(), "$type scaffold is invalid: $problems")
            } finally {
                Files.deleteIfExists(path)
            }
        }
    }

    @Test
    fun `scaffolding refuses an unknown type with the shared message`() {
        val path = Files.createTempFile("landify-nope", ".yaml")
        val error = assertFailsWith<LandifyException> { writePlaceholder(path, "nope") }
        assertContains(error.message.orEmpty(), """type "nope" is not supported""")
    }

    @Test
    fun `an existing file is not overwritten without force`() {
        val path = Files.createTempFile("landify-existing", ".yaml")
        try {
            Files.writeString(path, "site:\n  name: Mine\n")
            assertFailsWith<LandifyException> { writePlaceholder(path, "product") }
            assertEquals("site:\n  name: Mine\n", Files.readString(path))
            writePlaceholder(path, "product", force = true)
            assertTrue(Files.readString(path).contains("hero:"), "force did not replace the file")
        } finally {
            Files.deleteIfExists(path)
        }
    }

    @Test
    fun `validateFile rejects a missing file`() {
        assertFailsWith<Exception> { validateFile(java.nio.file.Path.of("does-not-exist.yaml")) }
    }
}
