package io.github.hieudoanm.kevin.mcp

import java.io.Reader

/**
 * One frame read from the client, or the fact that the stream ended.
 *
 * [tooLong] marks a frame that exceeded [maxChars]: its contents are discarded
 * and the reader is left on the next newline, so the stream resynchronises
 * instead of desynchronising the client.
 */
internal sealed interface Frame {
    data class Line(val text: String) : Frame

    data object TooLong : Frame

    data object Eof : Frame
}

/**
 * Reads newline-delimited frames under a hard cap.
 *
 * `BufferedReader.readLine` cannot be used for this: it materialises a whole
 * line before the caller can measure it, so a client that never sends a newline
 * would grow the heap without limit. This reader stops accumulating at
 * [maxChars] and drains the rest of the oversized line instead.
 */
internal class FrameReader(
    private val reader: Reader,
    private val maxChars: Int = MAX_FRAME_CHARS,
) {
    fun next(): Frame {
        val buffer = StringBuilder()
        var overflowed = false
        while (true) {
            val read = reader.read()
            if (read < 0) {
                // A trailing frame with no newline is still a frame.
                if (buffer.isEmpty() && !overflowed) return Frame.Eof
                return if (overflowed) Frame.TooLong else Frame.Line(buffer.toString())
            }
            if (read == NEWLINE_CODE) {
                return if (overflowed) Frame.TooLong else Frame.Line(buffer.toString())
            }
            if (!overflowed) {
                if (buffer.length >= maxChars) {
                    overflowed = true
                    buffer.setLength(0)
                } else {
                    buffer.append(read.toChar())
                }
            }
        }
    }

    private companion object {
        const val NEWLINE_CODE = '\n'.code
    }
}
