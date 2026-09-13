import GaugeCore
import SwiftUI

/// The Gauge Network tab for live download / upload throughput and per-interface traffic.
struct NetworkView: View {
    @ObservedObject var viewModel: NetworkViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            if let stats = viewModel.stats {
                ScrollView {
                    VStack(alignment: .leading, spacing: 14) {
                        speedsSection(stats: stats)

                        totalsSection

                        interfacesSection(stats: stats)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
                .frame(maxHeight: 420)
            } else {
                emptyState
            }
        }
        .padding(14)
        .task {
            viewModel.start()
        }
    }

    private var header: some View {
        HStack {
            Label("Network", systemImage: "network")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button(action: { viewModel.refresh() }) {
                Image(systemName: "arrow.clockwise")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Refresh")
            }
            .buttonStyle(.borderless)
            .help("Refresh")
        }
        .padding(.bottom, 16)
    }

    private func speedsSection(stats: NetworkStats) -> some View {
        HStack(spacing: 16) {
            speedColumn(
                title: "Download",
                symbol: "arrow.down",
                rate: stats.totalReceiveBytesPerSecond
            )
            Divider()
                .frame(height: 34)
            speedColumn(
                title: "Upload",
                symbol: "arrow.up",
                rate: stats.totalSendBytesPerSecond
            )
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(accessibilitySpeedsLabel(stats))")
    }

    private func speedColumn(title: String, symbol: String, rate: Double?) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Label(title, systemImage: symbol)
                .font(.caption)
                .foregroundColor(.secondary)
                .padding(.top, 8)
            Text(ByteFormatter.rate(rate))
                .font(.system(.title3, design: .monospaced))
                .fontWeight(.semibold)
                .monospacedDigit()
        }
    }

    private var totalsSection: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Total (this session)")
                .font(.caption)
                .foregroundColor(.secondary)
            HStack(spacing: 16) {
                totalValue(label: "Received", bytes: viewModel.totalReceivedBytes)
                totalValue(label: "Sent", bytes: viewModel.totalSentBytes)
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(accessibilityTotalsLabel)")
    }

    private func totalValue(label: String, bytes: UInt64) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(label)
                .font(.caption2)
                .foregroundColor(.secondary)
            Text(ByteFormatter.humanReadable(bytes))
                .font(.system(.callout, design: .monospaced))
                .monospacedDigit()
        }
    }

    private func interfacesSection(stats: NetworkStats) -> some View {
        let interfaces = relevantInterfaces(stats)
        return VStack(alignment: .leading, spacing: 6) {
            ForEach(Array(interfaces.enumerated()), id: \.element.sample.name) { _, interface in
                NetworkInterfaceRow(interface: interface)
            }
        }
    }

    private func relevantInterfaces(_ stats: NetworkStats) -> [NetworkInterfaceStats] {
        stats.interfaces.filter { interface in
            let sample = interface.sample
            return sample.isUp
                && (sample.hasAddress || sample.receivedBytes > 0 || sample.sentBytes > 0)
        }
    }

    private var emptyState: some View {
        VStack(spacing: 12) {
            Image(systemName: "network.slash")
                .font(.system(size: 36))
                .foregroundColor(.secondary)
            Text("Unable to read network stats")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 48)
    }

    private var accessibilityTotalsLabel: String {
        "Total received \(ByteFormatter.humanReadable(viewModel.totalReceivedBytes)), "
            + "total sent \(ByteFormatter.humanReadable(viewModel.totalSentBytes))"
    }

    private func accessibilitySpeedsLabel(_ stats: NetworkStats) -> String {
        "Download \(ByteFormatter.rate(stats.totalReceiveBytesPerSecond)), "
            + "upload \(ByteFormatter.rate(stats.totalSendBytesPerSecond))"
    }
}

private struct NetworkInterfaceRow: View {
    let interface: NetworkInterfaceStats

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: interface.sample.kind.systemImage)
                .font(.system(size: 15))
                .foregroundColor(.secondary)
                .frame(width: 20)

            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(interface.sample.name)
                        .font(.system(.callout, design: .monospaced))
                    Text(interface.sample.kind.displayName)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                HStack(spacing: 4) {
                    statusDot
                    Text(statusText)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 2) {
                Text("↓ \(ByteFormatter.rate(interface.receiveBytesPerSecond))")
                    .font(.system(.caption, design: .monospaced))
                    .monospacedDigit()
                Text("↑ \(ByteFormatter.rate(interface.sendBytesPerSecond))")
                    .font(.system(.caption, design: .monospaced))
                    .monospacedDigit()
            }
        }
        .padding(.vertical, 5)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(accessibilityLabel)")
    }

    private var statusText: String {
        switch status {
        case .connected: return "Connected"
        case .up: return "Link up"
        case .down: return "Down"
        }
    }

    private var statusDot: some View {
        Image(systemName: "circle.fill")
            .font(.system(size: 7))
            .foregroundColor(dotColor)
    }

    private var dotColor: Color {
        switch status {
        case .connected: return .green
        case .up: return .orange
        case .down: return .secondary
        }
    }

    private var status: ConnectionStatus {
        if !interface.sample.isUp {
            return .down
        }
        return interface.sample.hasAddress ? .connected : .up
    }

    private var accessibilityLabel: String {
        "\(interface.sample.name) \(interface.sample.kind.displayName), \(statusText), "
            + "download \(ByteFormatter.rate(interface.receiveBytesPerSecond)), "
            + "upload \(ByteFormatter.rate(interface.sendBytesPerSecond))"
    }
}

private enum ConnectionStatus {
    case connected
    case up
    case down
}

private extension NetworkInterfaceKind {
    var systemImage: String {
        switch self {
        case .wifi: return "wifi"
        case .ethernet: return "cable.connector"
        case .other: return "network"
        }
    }
}