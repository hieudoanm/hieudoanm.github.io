package io.github.hieudoanm.backbone.cron

import com.sun.net.httpserver.HttpServer
import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.database.toList
import io.github.hieudoanm.backbone.http.createHttpClient
import io.ktor.client.*
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.io.File
import java.net.InetSocketAddress
import kotlin.test.Test
import kotlin.test.assertEquals

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CronJobsTest {
    private lateinit var db: Database
    private lateinit var httpClient: HttpClient
    private lateinit var tempDir: File
    private var server: HttpServer? = null

    @BeforeAll
    fun setup() {
        tempDir = createTempDir("cron-test-")
        val config = AppConfig(
            port = 0, jwtSecret = "test-secret-32-characters-long!!!!",
            backboneData = tempDir.absolutePath, secretsKeyHex = null,
        )
        db = Database(config)
        httpClient = createHttpClient()
    }

    @AfterAll
    fun teardown() {
        server?.stop(0)
        httpClient.close()
        db.close()
        tempDir.deleteRecursively()
    }

    @Test
    fun `executeCronJob records success log`() = runBlocking {
        server?.stop(0)
        server = HttpServer.create(InetSocketAddress(0), 0).also { s ->
            s.createContext("/ping") { exchange ->
                exchange.sendResponseHeaders(200, 0)
                exchange.responseBody.close()
            }
            s.start()
        }
        val port = server!!.address.port

        val jobId = "job-success"
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _cronjobs (id, name, schedule, command, method, is_active)
                VALUES ('$jobId', 'test-ping', '*/1 * * * *', 'http://localhost:$port/ping', 'GET', 1)
            """)
        }

        executeCronJob(db, httpClient, jobId)

        val logs = db.connection().use { conn ->
            conn.createStatement().executeQuery(
                "SELECT * FROM _cronjob_logs WHERE cronjob_id = '$jobId'"
            ).toList()
        }
        assertEquals(1, logs.size)
        assertEquals("success", logs[0]["status"])
    }

    @Test
    fun `executeCronJob records failure log on error`() = runBlocking {
        val jobId = "job-fail"
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _cronjobs (id, name, schedule, command, method, is_active)
                VALUES ('$jobId', 'test-fail', '*/1 * * * *', 'http://localhost:1/nonexist', 'GET', 1)
            """)
        }

        executeCronJob(db, httpClient, jobId)

        val logs = db.connection().use { conn ->
            conn.createStatement().executeQuery(
                "SELECT * FROM _cronjob_logs WHERE cronjob_id = '$jobId'"
            ).toList()
        }
        assertEquals(1, logs.size)
        assertEquals("failure", logs[0]["status"])
    }
}
