import GaugeCore
import SwiftUI

struct DiskView: View {
    let stats: DiskStats?

    var body: some View {
        if let stats {
            ResourceMeter(
                title: "Storage",
                usedBytes: stats.usedBytes,
                totalBytes: stats.totalBytes,
                percentage: stats.usagePercentage
            )
        } else {
            UnavailableView(title: "Storage")
        }
    }
}