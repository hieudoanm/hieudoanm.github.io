import GaugeCore
import SwiftUI

struct ResourceMeter: View {
    let title: String
    let usedBytes: UInt64
    let totalBytes: UInt64
    let percentage: Double

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
        }
    }

    private var fraction: Double {
        min(max(percentage / 100, 0), 1)
    }

    private var percentageText: String {
        "\(Int(percentage.rounded()))% used"
    }

    private var thresholdColor: Color {
        switch ThresholdMonitor.status(for: percentage) {
        case .normal: return Color.secondary
        case .elevated: return Color.orange
        case .high: return Color.red
        }
    }
}