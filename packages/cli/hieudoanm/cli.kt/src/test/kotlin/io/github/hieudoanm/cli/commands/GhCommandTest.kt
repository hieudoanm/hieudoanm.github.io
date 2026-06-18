package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class GhCommandTest {
    @Test
    fun testGhHelp() {
        val cmd = GhCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGhLanguagesInvalidRepo() {
        val cmd = GhCommand()
        val result = cmd.test("languages --repo invalid --output /tmp/gh-test.svg")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "format owner/repo")
    }

    @Test
    fun testGhLanguagesNetworkError() {
        val cmd = GhCommand()
        val result = cmd.test("languages --repo owner/repo --output /tmp/gh-lang-test.svg")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "error fetching")
    }

    @Test
    fun testGhOgInvalidRepo() {
        val cmd = GhCommand()
        val result = cmd.test("og --url invalid")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "format owner/repo")
    }

    @Test
    fun testGhOgNetworkError() {
        val cmd = GhCommand()
        val result = cmd.test("og --url owner/repo --output /tmp/gh-og-test.svg")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "error fetching")
    }

    @Test
    fun testGhLicenseHelp() {
        val cmd = GhCommand()
        val result = cmd.test("license --help")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotEmpty())
    }

    @Test
    fun testGhLicenseNetworkError() {
        val cmd = GhCommand()
        val result = cmd.test("license --spdx-id MIT --output /tmp/gh-license-test.txt")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGhCocHelp() {
        val cmd = GhCommand()
        val result = cmd.test("coc --help")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotEmpty())
    }

    @Test
    fun testGhCocNetworkError() {
        val cmd = GhCommand()
        val result = cmd.test("coc --key contributor-covenant --output /tmp/gh-coc-test.txt")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGhIgnoreHelp() {
        val cmd = GhCommand()
        val result = cmd.test("ignore --help")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotEmpty())
    }

    @Test
    fun testGhIgnoreNetworkError() {
        val cmd = GhCommand()
        val result = cmd.test("ignore --name Python --output /tmp/gh-ignore-test.txt")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGhOgHelp() {
        val cmd = GhCommand()
        val result = cmd.test("og --help")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotEmpty())
    }

    @Test
    fun testGhRepoDataClass() {
        val owner = GhOwner(login = "testuser", avatar_url = "https://example.com/avatar.png")
        val repo = GhRepo(
            name = "test-repo",
            full_name = "testuser/test-repo",
            description = "A test repo",
            html_url = "https://github.com/testuser/test-repo",
            stargazers_count = 10,
            forks_count = 5,
            language = "Kotlin",
            owner = owner
        )
        assertEquals("test-repo", repo.name)
        assertEquals("testuser", repo.owner.login)
    }

    @Test
    fun testGhLicenseDataClass() {
        val lic = GhLicense(key = "mit", name = "MIT License", spdx_id = "MIT", url = "https://example.com", body = "MIT License text")
        assertEquals("MIT", lic.spdx_id)
    }

    @Test
    fun testGhCodeOfConductDataClass() {
        val coc = GhCodeOfConduct(key = "contributor-covenant", name = "Contributor Covenant", url = "https://example.com", body = "Be nice")
        assertEquals("contributor-covenant", coc.key)
    }

    @Test
    fun testGitignoreTemplateDataClass() {
        val tmpl = GitignoreTemplate(name = "Python", source = "*.pyc")
        assertEquals("Python", tmpl.name)
    }

    @Test
    fun testGhOwnerDataClass() {
        val owner = GhOwner(login = "testuser", avatar_url = "https://example.com/avatar")
        assertEquals("testuser", owner.login)
    }
}
