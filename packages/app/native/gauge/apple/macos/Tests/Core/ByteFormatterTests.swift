import Testing
import Foundation
@testable import GaugeCore

@Suite("ByteFormatter")
struct ByteFormatterTests {

    @Test("bytes unit")
    func bytes() {
        #expect(ByteFormatter.humanReadable(0) == "0 B")
        #expect(ByteFormatter.humanReadable(512) == "512 B")
    }

    @Test("kilobytes")
    func kilobytes() {
        #expect(ByteFormatter.humanReadable(1_024) == "1.0 KB")
        #expect(ByteFormatter.humanReadable(1_500) == "1.5 KB")
        #expect(ByteFormatter.humanReadable(153_600) == "150 KB")
    }

    @Test("megabytes")
    func megabytes() {
        #expect(ByteFormatter.humanReadable(1_048_576) == "1.0 MB")
        #expect(ByteFormatter.humanReadable(13_000_000) == "12.4 MB")
        #expect(ByteFormatter.humanReadable(113_000_000) == "108 MB")
    }

    @Test("gigabytes")
    func gigabytes() {
        #expect(ByteFormatter.humanReadable(1_073_741_824) == "1.0 GB")
        #expect(ByteFormatter.humanReadable(13_300_000_000) == "12.4 GB")
        #expect(ByteFormatter.humanReadable(412_000_000_000) == "384 GB")
    }

    @Test("terabytes")
    func terabytes() {
        #expect(ByteFormatter.humanReadable(1_299_100_000_000) == "1.2 TB")
        #expect(ByteFormatter.humanReadable(2_199_000_000_000) == "2.0 TB")
    }

    @Test("used over total combines both")
    func usedOverTotal() {
        #expect(ByteFormatter.usedOverTotal(usedBytes: 12_400_000_000, totalBytes: 32_000_000_000) == "11.5 GB / 29.8 GB")
    }

    @Test("rounds large values without excessive precision")
    func noExcessivePrecision() {
        #expect(ByteFormatter.humanReadable(113_000_000_000) == "105 GB")
        #expect(ByteFormatter.humanReadable(13_438_291_000) == "12.5 GB")
    }
}