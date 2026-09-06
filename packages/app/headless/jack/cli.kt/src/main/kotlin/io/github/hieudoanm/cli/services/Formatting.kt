package io.github.hieudoanm.cli.services

import java.text.NumberFormat
import java.util.Locale

fun comma(n: Number): String {
    return NumberFormat.getNumberInstance(Locale.US).format(n)
}
