package io.github.hieudoanm.kevin.db

import kotlinx.serialization.EncodeDefault
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.nio.file.attribute.PosixFilePermissions

/**
 * JSON representation of a [Db].
 *
 * [expires] holds epoch milliseconds so the on-disk format stays numeric; the
 * field is omitted when no key carries an expiry.
 */
@Serializable
internal data class Snapshot(
    val data: Map<String, String>,
    @EncodeDefault(EncodeDefault.Mode.NEVER)
    val expires: Map<String, Long> = emptyMap(),
)

private val json = Json { prettyPrint = true }

/** Writes the store to [path] atomically via a temp file and a rename. */
fun Db.save(path: Path) {
    val snapshot = Snapshot(snapshotData(), snapshotExpires())
    val temp = path.resolveSibling("${path.fileName}.tmp")
    writePrivate(temp, json.encodeToString(Snapshot.serializer(), snapshot))
    Files.move(temp, path, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE)
}

/** Replaces the store contents from a snapshot; a missing file is a no-op. */
fun Db.load(path: Path) {
    if (!Files.exists(path)) return
    val snapshot = json.decodeFromString(Snapshot.serializer(), Files.readString(path))
    replaceAll(snapshot.data, snapshot.expires)
}

private fun writePrivate(path: Path, contents: String) {
    Files.writeString(path, contents)
    runCatching {
        Files.setPosixFilePermissions(path, PosixFilePermissions.fromString("rw-------"))
    }
}
