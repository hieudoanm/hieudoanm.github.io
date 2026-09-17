package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class SemverCommandTest {
    @Test
    fun testSemverValidate() {
        val cmd = SemverCommand()
        val result = cmd.test("validate --versions 1.2.3")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "valid")
    }

    @Test
    fun testSemverValidateInvalid() {
        val cmd = SemverCommand()
        val result = cmd.test("validate --versions 'not-valid'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "invalid")
    }

    @Test
    fun testSemverValidateJson() {
        val cmd = SemverCommand()
        val result = cmd.test("validate --versions 1.0.0 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "valid")
        assertContains(result.stdout, "1.0.0")
    }

    @Test
    fun testSemverCompare() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 1.0.0 --b 2.0.0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "<")
    }

    @Test
    fun testSemverCompareEqual() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 1.0.0 --b 1.0.0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "==")
    }

    @Test
    fun testSemverCompareGreater() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 2.0.0 --b 1.0.0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, ">")
    }

    @Test
    fun testSemverCompareJson() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 1.0.0 --b 1.0.0 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "relation")
    }

    @Test
    fun testSemverBumpPatch() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.2.3 --patch")
        assertEquals(0, result.statusCode)
        assertEquals("1.2.4", result.stdout.trim())
    }

    @Test
    fun testSemverBumpMinor() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.2.3 --minor")
        assertEquals(0, result.statusCode)
        assertEquals("1.3.0", result.stdout.trim())
    }

    @Test
    fun testSemverBumpMajor() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.2.3 --major")
        assertEquals(0, result.statusCode)
        assertEquals("2.0.0", result.stdout.trim())
    }

    @Test
    fun testSemverBumpPrerelease() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.0.0 --minor --pre alpha")
        assertEquals(0, result.statusCode)
        assertEquals("1.1.0-alpha", result.stdout.trim())
    }

    @Test
    fun testSemverBumpJson() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.0.0 --patch --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "result")
        assertContains(result.stdout, "1.0.1")
    }

    @Test
    fun testSemverSort() {
        val cmd = SemverCommand()
        val result = cmd.test("sort --versions 2.0.0,1.0.0,3.0.0")
        assertEquals(0, result.statusCode)
        val lines = result.stdout.trim().lines()
        assertEquals(3, lines.size)
        assertContains(lines[0], "1.0.0")
        assertContains(lines[2], "3.0.0")
    }

    @Test
    fun testSemverSortJson() {
        val cmd = SemverCommand()
        val result = cmd.test("sort --versions 3.0.0,1.0.0 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "sorted")
    }

    @Test
    fun testSemverRange() {
        val cmd = SemverCommand()
        val result = cmd.test("range --version 1.5.0 --range '>= 1.0.0 < 2.0.0'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "matches")
    }

    @Test
    fun testSemverRangeNoMatch() {
        val cmd = SemverCommand()
        val result = cmd.test("range --version 3.0.0 --range '>= 1.0.0 < 2.0.0'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "does NOT match")
    }

    @Test
    fun testSemverRangeJson() {
        val cmd = SemverCommand()
        val result = cmd.test("range --version 1.0.0 --range '>= 1.0.0' --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "matches")
    }

    @Test
    fun testSemverVersionConstructor() {
        val v = SemverVersion(major = 1, minor = 2, patch = 3)
        assertEquals(1, v.major)
        assertEquals(2, v.minor)
        assertEquals(3, v.patch)
        assertEquals("", v.prerelease)
    }

    @Test
    fun testSemverVersionPrerelease() {
        val v = SemverVersion(major = 1, minor = 0, patch = 0, prerelease = "alpha")
        assertEquals("alpha", v.prerelease)
    }

    @Test
    fun testSemverVersionCompareLess() {
        val a = SemverVersion(1, 0, 0)
        val b = SemverVersion(2, 0, 0)
        assertTrue(a.compare(b) < 0)
    }

    @Test
    fun testSemverVersionCompareGreater() {
        val a = SemverVersion(3, 0, 0)
        val b = SemverVersion(1, 0, 0)
        assertTrue(a.compare(b) > 0)
    }

    @Test
    fun testSemverVersionCompareEqual() {
        val a = SemverVersion(1, 2, 3)
        val b = SemverVersion(1, 2, 3)
        assertEquals(0, a.compare(b))
    }

    @Test
    fun testSemverVersionCompareMinor() {
        val a = SemverVersion(1, 5, 0)
        val b = SemverVersion(1, 2, 0)
        assertTrue(a.compare(b) > 0)
    }

    @Test
    fun testSemverVersionComparePatch() {
        val a = SemverVersion(1, 2, 3)
        val b = SemverVersion(1, 2, 1)
        assertTrue(a.compare(b) > 0)
    }

    @Test
    fun testSemverVersionComparePrereleaseVsRelease() {
        val a = SemverVersion(1, 0, 0)
        val b = SemverVersion(1, 0, 0, prerelease = "alpha")
        assertTrue(a.compare(b) > 0)
    }

    @Test
    fun testSemverVersionComparePrereleaseVsReleaseOther() {
        val a = SemverVersion(1, 0, 0, prerelease = "alpha")
        val b = SemverVersion(1, 0, 0)
        assertTrue(a.compare(b) < 0)
    }

    @Test
    fun testSemverVersionComparePrerelease() {
        val a = SemverVersion(1, 0, 0, prerelease = "alpha")
        val b = SemverVersion(1, 0, 0, prerelease = "beta")
        assertTrue(a.compare(b) < 0)
    }

    @Test
    fun testSemverVersionBumpMajor() {
        val v = SemverVersion(1, 2, 3).bump("major")
        assertEquals(SemverVersion(2, 0, 0), v)
    }

    @Test
    fun testSemverVersionBumpMinor() {
        val v = SemverVersion(1, 2, 3).bump("minor")
        assertEquals(SemverVersion(1, 3, 0), v)
    }

    @Test
    fun testSemverVersionBumpPatch() {
        val v = SemverVersion(1, 2, 3).bump("patch")
        assertEquals(SemverVersion(1, 2, 4), v)
    }

    @Test
    fun testSemverVersionBumpUnknown() {
        val v = SemverVersion(1, 2, 3).bump("unknown")
        assertEquals(SemverVersion(1, 2, 3), v)
    }

    @Test
    fun testSemverVersionToString() {
        assertEquals("1.2.3", SemverVersion(1, 2, 3).toString())
        assertEquals("1.0.0-alpha", SemverVersion(1, 0, 0, prerelease = "alpha").toString())
    }

    @Test
    fun testParseSemverBasic() {
        val v = parseSemver("1.2.3")
        assertEquals(SemverVersion(1, 2, 3), v)
    }

    @Test
    fun testParseSemverVPrefixed() {
        val v = parseSemver("v2.0.0")
        assertEquals(SemverVersion(2, 0, 0), v)
    }

    @Test
    fun testParseSemverPrerelease() {
        val v = parseSemver("1.0.0-beta")
        assertEquals(SemverVersion(1, 0, 0, prerelease = "beta"), v)
    }

    @Test
    fun testParseSemverPrereleaseDotted() {
        val v = parseSemver("1.0.0-alpha.1")
        assertEquals("alpha.1", v.prerelease)
    }

    @Test
    fun testParseSemverTooFewParts() {
        assertFailsWith<IllegalArgumentException> { parseSemver("1.0") }
    }

    @Test
    fun testParseSemverInvalidMajor() {
        assertFailsWith<IllegalArgumentException> { parseSemver("abc.1.0") }
    }

    @Test
    fun testCheckRangeGreaterThan() {
        val v = parseSemver("2.0.0")
        assertTrue(checkRange(v, "> 1.0.0"))
        assertFalse(checkRange(v, "> 3.0.0"))
    }

    @Test
    fun testCheckRangeGreaterEqual() {
        val v = parseSemver("2.0.0")
        assertTrue(checkRange(v, ">= 2.0.0"))
        assertTrue(checkRange(v, ">= 1.0.0"))
        assertFalse(checkRange(v, ">= 3.0.0"))
    }

    @Test
    fun testCheckRangeLessThan() {
        val v = parseSemver("1.0.0")
        assertTrue(checkRange(v, "< 2.0.0"))
        assertFalse(checkRange(v, "< 1.0.0"))
    }

    @Test
    fun testCheckRangeLessEqual() {
        val v = parseSemver("1.0.0")
        assertTrue(checkRange(v, "<= 1.0.0"))
        assertFalse(checkRange(v, "<= 0.9.0"))
    }

    @Test
    fun testCheckRangeEqual() {
        val v = parseSemver("1.2.3")
        assertTrue(checkRange(v, "= 1.2.3"))
        assertTrue(checkRange(v, "== 1.2.3"))
        assertFalse(checkRange(v, "= 2.0.0"))
    }

    @Test
    fun testCheckRangeCompound() {
        val v = parseSemver("1.5.0")
        assertTrue(checkRange(v, ">= 1.0.0 < 2.0.0"))
        assertFalse(checkRange(v, ">= 2.0.0 < 3.0.0"))
    }

    @Test
    fun testCheckRangeUnknownOperator() {
        val v = parseSemver("1.0.0")
        assertFailsWith<IllegalArgumentException> { checkRange(v, "~> 1.0.0") }
    }

    @Test
    fun testCheckRangeIncomplete() {
        val v = parseSemver("1.0.0")
        assertFailsWith<IllegalArgumentException> { checkRange(v, ">=") }
    }

    @Test
    fun testCheckRangeEmpty() {
        val v = parseSemver("1.0.0")
        assertFailsWith<IllegalArgumentException> { checkRange(v, "") }
    }
}
