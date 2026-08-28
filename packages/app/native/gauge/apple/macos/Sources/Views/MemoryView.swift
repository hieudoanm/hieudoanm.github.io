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
                percentage: stats.usagePercentage
            )
        } else {
            UnavailableView(title: "Memory")
        }
    }
}