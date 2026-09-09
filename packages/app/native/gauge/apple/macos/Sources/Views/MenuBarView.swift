import GaugeCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var clipboardViewModel: ClipboardViewModel
    @ObservedObject var viewModel: GaugeViewModel
    @ObservedObject var networkViewModel: NetworkViewModel
    @ObservedObject var portsViewModel: PortsViewModel

    private enum Tab: Hashable {
        case clipboard
        case memory
        case network
        case ports
    }

    @State private var selectedTab: Tab = .memory
    @State private var showsDetails = false

    var body: some View {
        VStack(spacing: 0) {
            tabBar

            Divider()

            content
        }
        .frame(width: 360)
        .onAppear {
            viewModel.refresh()
            networkViewModel.start()
            portsViewModel.start()
        }
        .animation(.easeInOut(duration: 0.15), value: selectedTab)
        .animation(.easeInOut(duration: 0.15), value: showsDetails)
    }

    private var tabBar: some View {
        Picker("Tab", selection: $selectedTab) {
            Text("Clipboard").tag(Tab.clipboard)
            Text("Memory").tag(Tab.memory)
            Text("Network").tag(Tab.network)
            Text("Ports").tag(Tab.ports)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
    }

    @ViewBuilder
    private var content: some View {
        switch selectedTab {
        case .clipboard:
            ClipboardView(viewModel: clipboardViewModel)
                .transition(.opacity)
        case .memory:
            Group {
                if showsDetails {
                    DetailsView(
                        viewModel: viewModel,
                        showSmall: { showsDetails = false }
                    )
                    .transition(.move(edge: .leading).combined(with: .opacity))
                } else {
                    SmallView(
                        viewModel: viewModel,
                        showDetails: { showsDetails = true }
                    )
                    .transition(.move(edge: .trailing).combined(with: .opacity))
                }
            }
        case .network:
            NetworkView(viewModel: networkViewModel)
                .transition(.opacity)
        case .ports:
            PortsView(viewModel: portsViewModel)
                .transition(.opacity)
        }
    }
}