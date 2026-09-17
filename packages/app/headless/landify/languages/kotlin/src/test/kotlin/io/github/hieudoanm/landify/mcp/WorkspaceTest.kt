package io.github.hieudoanm.landify.mcp

import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.createTempDirectory
import kotlin.io.path.writeText
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class WorkspaceTest {

    private fun workspace(dir: Path): Workspace = Workspace.of(dir.toString())

    // An absolute path is rejected rather than silently served.
    @Test
    fun absolutePathsAreRefused() {
        val error = assertFailsWith<LandifyWorkspaceException> {
            workspace(createTempDirectory()).resolve("/etc/passwd")
        }
        assertContains(error.message!!, "must be relative")
    }

    // A ".." escape is refused rather than quietly rewritten, so a caller that
    // means to leave the sandbox surfaces its own bug.
    @Test
    fun parentEscapesAreRefused() {
        val error = assertFailsWith<LandifyWorkspaceException> {
            workspace(createTempDirectory()).resolve("../outside.yaml")
        }
        assertContains(error.message!!, "escapes the server root")
    }

    // A symlink inside the root pointing out of it is an escape, not a
    // shortcut, so it is refused even though the lexical join stays inside.
    @Test
    fun aSymlinkOutOfTheRootIsRefused() {
        val outside = createTempDirectory()
        val root = createTempDirectory()
        val secret = outside.resolve("secret.yaml").also { it.writeText("type: product\n") }
        Files.createSymbolicLink(root.resolve("link.yaml"), secret)

        val error = assertFailsWith<LandifyWorkspaceException> { workspace(root).read("link.yaml") }
        assertContains(error.message!!, "escapes the server root")
    }

    // A broken symlink is refused outright. Its target does not exist, so
    // nothing is written there yet and a naive walk would approve the link's own
    // name — then the write would follow the link and create the file outside
    // the root.
    @Test
    fun aDanglingSymlinkIsRefusedForEveryOperation() {
        val root = createTempDirectory()
        Files.createSymbolicLink(
            root.resolve("dangling.yaml"),
            root.resolve("missing/target.yaml"),
        )
        val ws = workspace(root)

        assertFailsWith<LandifyWorkspaceException> { ws.write("dangling.yaml", "type: product\n") }
        assertFailsWith<LandifyWorkspaceException> { ws.read("dangling.yaml") }
        assertFailsWith<LandifyWorkspaceException> { ws.exists("dangling.yaml") }
    }

    // An existing symlink that stays inside the root is fine: it is a shortcut
    // to a permitted file, not an escape.
    @Test
    fun aSymlinkWithinTheRootIsAllowed() {
        val root = createTempDirectory()
        root.resolve("real.yaml").writeText("type: product\n")
        Files.createSymbolicLink(root.resolve("alias.yaml"), root.resolve("real.yaml"))

        assertEquals("type: product\n", workspace(root).read("alias.yaml"))
    }

    // A write creates parent directories inside the root.
    @Test
    fun writeCreatesParentDirectories() {
        val root = createTempDirectory()
        workspace(root).write("nested/deep/site.yaml", "type: product\n")
        assertTrue(Files.exists(root.resolve("nested/deep/site.yaml")))
    }

    // A read of a missing file names the path the model passed, not a resolved
    // absolute path it never supplied.
    @Test
    fun readingAMissingFileNamesTheRelativePath() {
        val root = createTempDirectory()
        val error = assertFailsWith<LandifyWorkspaceException> { workspace(root).read("missing.yaml") }
        assertContains(error.message!!, "missing.yaml")
        assertFalse(error.message!!.contains(root.toString()))
    }

    // An empty path resolves to the root, so callers can treat "" as the
    // current directory.
    @Test
    fun anEmptyPathResolvesToTheRoot() {
        val root = createTempDirectory().toRealPath()
        assertEquals(root.toString(), workspace(root).resolve(""))
    }
}
