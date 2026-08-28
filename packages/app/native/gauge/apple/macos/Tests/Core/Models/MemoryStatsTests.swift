import Testing
import Foundation
@testable import GaugeCore

@Suite("MemoryStats")
struct MemoryStatsTests {

    @Test("init stores values")
    func initValues() {
        let stats = MemoryStats(usedBytes: 4_000_000_000, totalBytes: 16_000_000_000)
        #expect(stats.usedBytes == 4_000_000_000)
        #expect(stats.totalBytes == 16_000_000_000)
    }

    @Test("usageRatio is used over total")
    func ratio() {
        let stats = MemoryStats(usedBytes: 8_000_000_000, totalBytes: 16_000_000_000)
        #expect(stats.usageRatio == 0.5)
    }

    @Test("usagePercentage is ratio times 100")
    func percentage() {
        let stats = MemoryStats(usedBytes: 12_000_000_000, totalBytes: 16_000_000_000)
        #expect(stats.usagePercentage == 75.0)
    }

    @Test("zero total returns zero ratio")
    func zeroTotal() {
        let stats = MemoryStats(usedBytes: 5, totalBytes: 0)
        #expect(stats.usageRatio == 0)
        #expect(stats.usagePercentage == 0)
    }

    @Test("zero used returns zero percentage")
    func zeroUsed() {
        let stats = MemoryStats(usedBytes: 0, totalBytes: 16_000_000_000)
        #expect(stats.usagePercentage == 0)
    }

    @Test("fully used reaches 100 percent")
    func fullyUsed() {
        let stats = MemoryStats(usedBytes: 16_000_000_000, totalBytes: 16_000_000_000)
        #expect(stats.usagePercentage == 100)
    }

    @Test("equality")
    func equality() {
        let a = MemoryStats(usedBytes: 1, totalBytes: 2)
        let b = MemoryStats(usedBytes: 1, totalBytes: 2)
        let c = MemoryStats(usedBytes: 2, totalBytes: 2)
        #expect(a == b)
        #expect(a != c)
    }
}