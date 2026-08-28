import Testing
import Foundation
@testable import GaugeCore

@Suite("DiskStats")
struct DiskStatsTests {

    @Test("init stores values")
    func initValues() {
        let stats = DiskStats(usedBytes: 400_000_000_000, totalBytes: 500_000_000_000)
        #expect(stats.usedBytes == 400_000_000_000)
        #expect(stats.totalBytes == 500_000_000_000)
    }

    @Test("usageRatio is used over total")
    func ratio() {
        let stats = DiskStats(usedBytes: 250_000_000_000, totalBytes: 500_000_000_000)
        #expect(stats.usageRatio == 0.5)
    }

    @Test("usagePercentage is ratio times 100")
    func percentage() {
        let stats = DiskStats(usedBytes: 412_000_000_000, totalBytes: 494_000_000_000)
        #expect(abs(stats.usagePercentage - 83.4) < 0.5)
    }

    @Test("zero total returns zero ratio")
    func zeroTotal() {
        let stats = DiskStats(usedBytes: 10, totalBytes: 0)
        #expect(stats.usageRatio == 0)
        #expect(stats.usagePercentage == 0)
    }

    @Test("zero used returns zero percentage")
    func zeroUsed() {
        let stats = DiskStats(usedBytes: 0, totalBytes: 500_000_000_000)
        #expect(stats.usagePercentage == 0)
    }

    @Test("fully used reaches 100 percent")
    func fullyUsed() {
        let stats = DiskStats(usedBytes: 500_000_000_000, totalBytes: 500_000_000_000)
        #expect(stats.usagePercentage == 100)
    }

    @Test("equality")
    func equality() {
        let a = DiskStats(usedBytes: 1, totalBytes: 2)
        let b = DiskStats(usedBytes: 1, totalBytes: 2)
        #expect(a == b)
    }
}