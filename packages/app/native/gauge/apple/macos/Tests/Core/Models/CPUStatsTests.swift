import Testing
import Foundation
@testable import GaugeCore

@Suite("CPUStats")
struct CPUStatsTests {

    @Test("init stores usage")
    func initValues() {
        let stats = CPUStats(usage: 12.5)
        #expect(stats.usage == 12.5)
    }

    @Test("clamps negative usage to zero")
    func clampsNegative() {
        let stats = CPUStats(usage: -5)
        #expect(stats.usage == 0)
    }

    @Test("clamps usage above 100 to 100")
    func clampsAboveHundred() {
        let stats = CPUStats(usage: 150)
        #expect(stats.usage == 100)
    }
}