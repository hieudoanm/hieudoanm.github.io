import AppKit
import GaugeCore
import SwiftUI

/// The Gauge IP tab: current public IP, geolocation, ASN/org, and a DNS lookup.
struct IPView: View {
    @ObservedObject var viewModel: IPViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            content
        }
        .padding(14)
        .task {
            await viewModel.refresh()
        }
    }

    private var header: some View {
        HStack {
            Label("IP", systemImage: "globe")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button {
                Task { await viewModel.refresh() }
            } label: {
                Image(systemName: "arrow.clockwise")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Refresh")
            }
            .buttonStyle(.borderless)
            .help("Refresh IP lookup")
        }
        .padding(.bottom, 16)
    }

    @ViewBuilder
    private var content: some View {
        switch viewModel.state {
        case .idle, .loading:
            loadingState
        case .offline:
            statusState(symbol: "wifi.slash", title: "Offline", detail: "Reconnect to the network and try again.")
        case .failed(let message):
            statusState(symbol: "exclamationmark.triangle", title: message, detail: "Unable to determine IP information.")
        case .loaded(let info):
            loadedContent(info)
        }
    }

    private var loadingState: some View {
        VStack(spacing: 8) {
            ProgressView()
                .controlSize(.small)
            Text("Looking up your IP…")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
        .accessibilityElement(children: .combine)
    }

    private func statusState(symbol: String, title: String, detail: String) -> some View {
        VStack(spacing: 8) {
            Image(systemName: symbol)
                .font(.system(size: 28, weight: .regular))
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            Text(title)
                .font(.headline)
                .multilineTextAlignment(.center)
            Text(detail)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
        .accessibilityElement(children: .combine)
    }

    private func loadedContent(_ info: IPInfo) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 6) {
                badges(info)

                infoSection(info)

                dnsSection
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(maxHeight: 420)
    }

    private func badges(_ info: IPInfo) -> some View {
        HStack(spacing: 6) {
            Text("via \(info.provider)")
                .font(.caption2)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(Color.secondary.opacity(0.15), in: Capsule())
            if viewModel.vpnDetected {
                Text("VPN / shared hosting")
                    .font(.caption2)
                    .foregroundColor(.orange)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(Color.orange.opacity(0.15), in: Capsule())
            }
            Spacer()
        }
        .padding(.top, 6)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(vpnBadgeAccessibilityLabel(info))
    }

    private func infoSection(_ info: IPInfo) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            InfoRow(label: "IP", value: info.ip)
            InfoRow(label: "Version", value: info.version)
            InfoRow(label: "ASN", value: info.asn)
            InfoRow(label: "Organization", value: info.org)
            InfoRow(label: "Timezone", value: info.timezone)
            InfoRow(label: "Country", value: info.countryName ?? info.countryCode)
            InfoRow(label: "Region", value: info.region)
            InfoRow(label: "City", value: info.city)
            InfoRow(label: "Postal", value: info.postal)
            InfoRow(label: "Coordinates", value: info.coordinatesText, mono: true)

            if let mapURL = Self.mapURL(latitude: info.latitude, longitude: info.longitude) {
                Button {
                    NSWorkspace.shared.open(mapURL)
                } label: {
                    Label("View on map", systemImage: "square.and.arrow.up")
                        .font(.caption)
                }
                .buttonStyle(.plain)
                .foregroundColor(.accentColor)
                .padding(.top, 6)
            }

            DisclosureGroup("Raw JSON") {
                Text(Self.jsonString(for: info))
                    .font(.system(.caption, design: .monospaced))
                    .foregroundColor(.secondary)
                    .textSelection(.enabled)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .font(.caption)
            .padding(.top, 6)
        }
    }

    private var dnsSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("DNS Lookup")
                .font(.caption)
                .foregroundColor(.secondary)

            HStack(spacing: 6) {
                TextField("example.com", text: $viewModel.domain)
                    .textFieldStyle(.roundedBorder)
                    .font(.system(.caption, design: .monospaced))
                    .onSubmit { runDNSLookup() }
                Button {
                    runDNSLookup()
                } label: {
                    Text("Lookup")
                        .font(.caption)
                }
                .disabled(viewModel.domain.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }

            dnsResult
        }
        .padding(.top, 4)
    }

    @ViewBuilder
    private var dnsResult: some View {
        switch viewModel.dnsState {
        case .idle:
            Text("Enter a domain to look up its A record.")
                .font(.caption)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        case .loading:
            HStack(spacing: 6) {
                ProgressView()
                    .controlSize(.small)
                Text("Looking up…")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        case .loaded(let response):
            VStack(alignment: .leading, spacing: 4) {
                if response.status == 0 {
                    Text(response.answersText)
                        .font(.system(.callout, design: .monospaced))
                        .textSelection(.enabled)
                } else {
                    Text("No A records found")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                DisclosureGroup("Response") {
                    Text(Self.jsonString(for: response))
                        .font(.system(.caption, design: .monospaced))
                        .foregroundColor(.secondary)
                        .textSelection(.enabled)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .font(.caption)
            }
        case .failed(let message):
            Label(message, systemImage: "exclamationmark.triangle")
                .font(.caption)
                .foregroundColor(.red)
        }
    }

    private func runDNSLookup() {
        guard !viewModel.domain.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        Task { await viewModel.lookupDNS() }
    }

    private func vpnBadgeAccessibilityLabel(_ info: IPInfo) -> String {
        viewModel.vpnDetected
            ? "Provider \(info.provider). VPN or shared hosting detected."
            : "Provider \(info.provider)."
    }

    private static func mapURL(latitude: String?, longitude: String?) -> URL? {
        guard let latitude, let longitude, !latitude.isEmpty, !longitude.isEmpty else { return nil }
        return URL(string: "https://www.openstreetmap.org/?mlat=\(latitude)&mlon=\(longitude)&zoom=12")
    }

    private static func jsonString(for value: some Encodable) -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        guard let data = try? encoder.encode(value),
              let string = String(data: data, encoding: .utf8) else {
            return "{}"
        }
        return string
    }
}

private struct InfoRow: View {
    let label: String
    let value: String?
    var mono = false

    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Text(label.uppercased())
                .font(.caption2)
                .foregroundColor(.secondary)
            Spacer()
            Text(value ?? "—")
                .font(mono ? .system(.caption, design: .monospaced) : .caption)
                .fontWeight(value == nil ? .regular : .medium)
                .foregroundColor(value == nil ? Color.secondary.opacity(0.4) : .primary)
                .multilineTextAlignment(.trailing)
                .textSelection(.enabled)
        }
        .padding(.vertical, 5)
        .overlay(alignment: .bottom) {
            Divider()
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(label), \(value ?? "unavailable")")
    }
}
