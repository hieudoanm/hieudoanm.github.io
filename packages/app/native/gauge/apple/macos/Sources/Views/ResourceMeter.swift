import GaugeCore
import SwiftUI

struct ResourceMeter: View {
    let title: String
    let usedBytes: UInt64
    let totalBytes: UInt64
    let percentage: Double
    let detailText: String?

    init(
        title: String,
        usedBytes: UInt64,
        totalBytes: UInt64,
        percentage: Double,
        detailText: String? = nil
    ) {
        self.title = title
        self.usedBytes = usedBytes
        self.totalBytes = totalBytes
        self.percentage = percentage
        self.detailText = detailText
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(title)
                    .font(.caption)
                    .foregroundColor(.secondary)
                Spacer()
                Text(percentageText)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(thresholdColor)
            }

            ProgressView(value: fraction)
                .tint(thresholdColor)

            Text(ByteFormatter.usedOverTotal(usedBytes: usedBytes, totalBytes: totalBytes))
                .font(.system(.caption, design: .monospaced))
                .monospacedDigit()
                .foregroundColor(.secondary)

            if let detailText {
                Text(detailText)
                    .font(.caption)
                    .lineLimit(1)
                    .foregroundColor(.secondary)
            }
        }
    }

    private var fraction: Double {
        min(max(percentage / 100, 0), 1)
    }

    private var percentageText: String {
        "\(Int(percentage.rounded()))% used"
    }

    private var thresholdColor: Color {
        Color(usageThreshold: ThresholdMonitor.status(for: percentage))
    }
}