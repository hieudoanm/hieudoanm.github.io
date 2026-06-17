package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import java.io.File

class DataCommandTest {
    private val csvContent = "name,age\nAlice,30\nBob,25"
    private val jsonContent = """{"name":"test","version":1}"""
    private val yamlContent = "name: test\nversion: 1"

    @Test
    fun testDataCsv() {
        val f = File("/tmp/test-data.csv")
        f.writeText(csvContent)
        val cmd = DataCommand()
        val result = cmd.test("csv /tmp/test-data.csv")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "name")
        assertContains(result.stdout, "Alice")
    }

    @Test
    fun testDataCsvJson() {
        val f = File("/tmp/test-data.csv")
        f.writeText(csvContent)
        val cmd = DataCommand()
        val result = cmd.test("csv /tmp/test-data.csv --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Alice")
    }

    @Test
    fun testDataJson() {
        val f = File("/tmp/test-data.json")
        f.writeText(jsonContent)
        val cmd = DataCommand()
        val result = cmd.test("json /tmp/test-data.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "test")
        assertContains(result.stdout, "version")
    }

    @Test
    fun testDataJsonQuery() {
        val f = File("/tmp/test-data.json")
        f.writeText(jsonContent)
        val cmd = DataCommand()
        val result = cmd.test("json /tmp/test-data.json --query name")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"test\"")
    }

    @Test
    fun testDataYml() {
        val f = File("/tmp/test-data.yml")
        f.writeText(yamlContent)
        val cmd = DataCommand()
        val result = cmd.test("yml /tmp/test-data.yml")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "name: test")
    }

    @Test
    fun testDataYmlValidate() {
        val f = File("/tmp/test-data.yml")
        f.writeText(yamlContent)
        val cmd = DataCommand()
        val result = cmd.test("yml /tmp/test-data.yml --validate")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Valid")
    }
}
