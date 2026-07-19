import MacOSXCore
import SwiftUI

/// The Network tab: live traffic, listening ports, and IP / DNS lookups.
struct NetworkView: View {
    @ObservedObject var networkViewModel: NetworkViewModel
    @ObservedObject var portsViewModel: PortsViewModel
    @ObservedObject var ipViewModel: IPViewModel

    private enum Section: Hashable {
        case traffic
        case ports
        case ip
    }

    @State private var section: Section = .traffic

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            sectionPicker

            Divider()

            content
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        }
        .padding(14)
    }

    private var header: some View {
        HStack {
            Label("Network", systemImage: "network")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button(action: refreshAll) {
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

    private var sectionPicker: some View {
        Picker("Section", selection: $section) {
            Text("Traffic").tag(Section.traffic)
            Text("Ports").tag(Section.ports)
            Text("IP & DNS").tag(Section.ip)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .accessibilityLabel("Network section")
    }

    @ViewBuilder
    private var content: some View {
        switch section {
        case .traffic:
            TrafficView(viewModel: networkViewModel)
                .transition(.opacity)
        case .ports:
            PortsSectionView(viewModel: portsViewModel)
                .transition(.opacity)
        case .ip:
            IPSectionView(viewModel: ipViewModel)
                .transition(.opacity)
        }
    }

    private func refreshAll() {
        networkViewModel.refresh()
        Task { await portsViewModel.refresh() }
        Task { await ipViewModel.refresh() }
    }
}