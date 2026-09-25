package io.github.hieudoanm.landify.mcp

/**
 * The file access the MCP tools are allowed to perform. A model chooses every
 * path that reaches it, so all access is confined to one root directory:
 * without this an LLM client could read or overwrite any file the server
 * process can reach.
 *
 * Construct one with [root] or [Workspace.of].
 */
class Workspace private constructor(val root: String) {

    /**
     * Turns a caller-supplied relative path into an absolute one that is
     * guaranteed to stay inside the root. An empty path resolves to the root
     * itself, so callers can treat "" as "the current directory".
     *
     * Absolute paths and any path that escapes via ".." are rejected rather than
     * silently rewritten: a caller that means to leave the sandbox has a bug,
     * and quietly serving a different file would hide it. Symlinks are resolved
     * too — a link inside the root pointing outside it is an escape, not a
     * shortcut — so a lexical join is never enough to prove containment.
     *
     * @throws LandifyWorkspaceException when the path is absolute, escapes the
     *   root, or traverses a symlink that cannot be confined to it.
     */
    fun resolve(path: String): String {
        val clean = path.trim()
        if (clean.isEmpty()) return root
        if (clean.startsWith("/") || clean.matches(ABSOLUTE_WINDOWS)) {
            throw LandifyWorkspaceException(
                "path \"$path\" must be relative to the server root $root",
            )
        }
        val target = java.nio.file.Path.of(root, clean).normalize().toString()
        if (!contains(target)) {
            throw LandifyWorkspaceException("path \"$path\" escapes the server root $root")
        }
        return target
    }

    /**
     * Reports whether [target] is the root itself or lives under it, both
     * lexically and after symlinks are resolved. The second check is what
     * catches a link inside the root that points out of it.
     */
    private fun contains(target: String): Boolean {
        if (!within(target)) return false
        val resolved = resolveExisting(target)
        return within(resolved)
    }

    /** Reports whether [target] is the root or sits under it. */
    private fun within(target: String): Boolean =
        target == root || target.startsWith(root + java.io.File.separator)

    /** Returns the contents of a file inside the root. */
    fun read(path: String): String {
        val target = resolve(path)
        val file = java.io.File(target)
        if (!file.exists()) {
            throw LandifyWorkspaceException("no such file in the server root: $path")
        }
        return file.readText()
    }

    /**
     * Creates or replaces a file inside the root, creating parent directories as
     * needed.
     */
    fun write(path: String, data: String) {
        val target = resolve(path)
        val file = java.io.File(target)
        file.parentFile?.takeIf { it.path != root }?.mkdirs()
        file.writeText(data)
    }

    /** Reports whether a path inside the root names an existing file. */
    fun exists(path: String): Boolean {
        val target = resolve(path)
        val file = java.io.File(target)
        return file.exists() && !file.isDirectory
    }

    companion object {
        /** The directory paths resolve against when the CLI is started without --root. */
        const val DEFAULT_ROOT = "."

        /** The file the tools read when a caller names no source. */
        const val DEFAULT_CONFIG_PATH = "landify.yaml"

        private val ABSOLUTE_WINDOWS = Regex("^[A-Za-z]:[\\\\/].*")

        /**
         * Returns a [Workspace] rooted at [dir]. The directory is resolved to an
         * absolute path once, so a later chdir cannot widen the sandbox, and must
         * already exist. Symlinks are resolved so the root is canonical and can be
         * compared against resolved paths.
         */
        fun of(dir: String): Workspace {
            val target = dir.trim().ifEmpty { DEFAULT_ROOT }
            val absolute = java.io.File(target).absoluteFile.normalize()
            val root = runCatching { absolute.canonicalPath }.getOrElse {
                throw LandifyWorkspaceException("root ${absolute.path}: ${it.message}")
            }
            val file = java.io.File(root)
            if (!file.exists()) {
                throw LandifyWorkspaceException("root $root: no such directory")
            }
            if (!file.isDirectory) {
                throw LandifyWorkspaceException("root $root is not a directory")
            }
            return Workspace(root)
        }
    }
}

/** A path that leaves the sandbox, or a file operation that failed. */
class LandifyWorkspaceException(message: String) : RuntimeException(message)

/**
 * Resolves symlinks in the longest existing prefix of [path] and re-appends the
 * segments that do not exist yet, so a file the server is about to create is
 * checked against the real location of its parent directory.
 *
 * A component that exists but cannot be resolved is a broken symlink, not a path
 * awaiting creation. Confusing the two would let a link inside the root point at
 * a location outside it: the target does not exist, so nothing is written there
 * yet, and the walk would happily approve the link's own name. The write would
 * then follow the link and create the file outside the root, so a broken symlink
 * is refused outright.
 */
private fun resolveExisting(path: String): String {
    val file = java.nio.file.Path.of(path)
    var tail = listOf<String>()
    var current: java.nio.file.Path? = file
    while (current != null) {
        // toRealPath, not canonicalPath: canonicalPath resolves a dangling
        // link to its missing target and reports success, which would let the
        // walk approve the link's own name. toRealPath fails on a component
        // that does not exist, which is the signal the branch below needs.
        val resolved = runCatching { current!!.toRealPath() }.getOrNull()
        if (resolved != null) {
            return tail.fold(resolved) { base, name -> base.resolve(name) }.toString()
        }
        if (isSymlink(current)) {
            throw LandifyWorkspaceException(
                "path $current is a symlink that does not resolve, " +
                    "so its target cannot be confined to the root",
            )
        }
        val name = current.fileName?.toString() ?: return file.toString()
        tail = listOf(name) + tail
        current = current.parent
    }
    return file.toString()
}

/**
 * Reports whether [file] is itself a symbolic link. Reading the link's own
 * attributes without following it means a broken link is still seen as a link.
 */
private fun isSymlink(path: java.nio.file.Path): Boolean = runCatching {
    java.nio.file.Files.readAttributes(
        path,
        java.nio.file.attribute.BasicFileAttributes::class.java,
        java.nio.file.LinkOption.NOFOLLOW_LINKS,
    ).isSymbolicLink
}.getOrDefault(false)
