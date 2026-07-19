package io.github.hieudoanm.browserverless.mcp

import java.io.BufferedReader

/**
 * The outcome of reading one frame: a normal line, or one that was too large.
 */
sealed interface Frame {
    data class Line(val text: String) : Frame
    data object TooLong : Frame
}

/**
 * Reads one newline-terminated frame, refusing anything larger than
 * [MAX_FRAME_CHARS]. This reads a character at a time rather than calling
 * [BufferedReader.readLine], which would allocate an unbounded line before the
 * cap could be applied. An over-long frame's remainder is consumed as junk so
 * the stream resynchronises on the next newline.
 */
fun readFrame(reader: BufferedReader): Frame? {
    val frame = StringBuilder()
    while (true) {
        val value = reader.read()
        if (value == -1) {
            if (frame.isEmpty()) return null
            return Frame.Line(frame.toString())
        }
        if (frame.length >= MAX_FRAME_CHARS) {
            discardToNewline(reader)
            return Frame.TooLong
        }
        frame.append(value.toChar())
        if (value == '\n'.code) return Frame.Line(frame.toString())
    }
}

/** Consumes characters up to and including the next newline. */
private fun discardToNewline(reader: BufferedReader) {
    while (true) {
        when (reader.read()) {
            -1, '\n'.code -> return
        }
    }
}
