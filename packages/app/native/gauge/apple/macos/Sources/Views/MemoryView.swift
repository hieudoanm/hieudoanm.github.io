import GaugeCore
import SwiftUI

struct MemoryView: View {
    let stats: MemoryStats?

    var body: some View {
        if let stats {
            ResourceMeter(
                title: "Memory",
                usedBytes: stats.usedBytes,
                totalBytes: stats.totalBytes,
                percentage: stats.usagePercentage,
                detailText: ByteFormatter.memoryBreakdown(
                    active: stats.activeBytes,
                    wired: stats.wiredBytes,
                    compressed: stats.compressedBytes
                )
            )
        } else {
            UnavailableView(title: "Memory")
        }
    }
}