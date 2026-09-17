package io.github.hieudoanm.backbone.mcp

import java.io.BufferedReader

/** Caps a single JSON-RPC frame. A larger frame is reported rather than buffered. */
const val MAX_FRAME_CHARS: Int = 8 * 1024 * 1024

/**
 * The outcome of reading one frame: a normal line, a frame past the cap, or end
 * of input.
 */
sealed interface Frame {
    /** A complete frame, newline included when one was present. */
    data class Line(val text: String) : Frame

    /** A frame larger than [MAX_FRAME_CHARS]; its tail has been discarded. */
    data object TooLong : Frame

    /** The stream ended. */
    data object Eof : Frame
}

/**
 * Reads one newline-terminated frame, refusing anything larger than
 * [MAX_FRAME_CHARS]. This reads a character at a time rather than calling
 * [BufferedReader.readLine], which would allocate an unbounded line before the
 * cap could be applied. An over-long frame's remainder is consumed as junk so
 * the stream resynchronises on the next newline.
 *
 * Bytes past the final newline are still returned as a frame: a client whose
 * last request omits the newline is normal, and dropping it would hang the
 * request.
 */
fun readFrame(reader: BufferedReader): Frame {
    val frame = StringBuilder()
    while (true) {
        val value = reader.read()
        if (value == -1) {
            return if (frame.isEmpty()) Frame.Eof else Frame.Line(frame.toString())
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
