import GaugeCore
import SwiftUI

struct CPUView: View {
    let stats: CPUStats?

    var body: some View {
        if let stats {
            let threshold = ThresholdMonitor.status(for: stats.usage)
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text("CPU")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Spacer()
                    Text("\(Int(stats.usage.rounded()))%")
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(Color(usageThreshold: threshold))
                }

                ProgressView(value: min(max(stats.usage / 100, 0), 1))
                    .tint(Color(usageThreshold: threshold))

                Text(stats.loadAverageText)
                    .font(.caption)
                    .lineLimit(1)
                    .foregroundColor(.secondary)
            }
        } else {
            UnavailableView(title: "CPU")
        }
    }
}