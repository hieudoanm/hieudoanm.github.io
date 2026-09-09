import GaugeCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var viewModel: GaugeViewModel
    @ObservedObject var portsViewModel: PortsViewModel

    private enum Tab: Hashable {
        case monitor
        case ports
    }

    @State private var selectedTab: Tab = .monitor
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
            portsViewModel.start()
        }
        .animation(.easeInOut(duration: 0.15), value: selectedTab)
        .animation(.easeInOut(duration: 0.15), value: showsDetails)
    }

    private var tabBar: some View {
        Picker("Tab", selection: $selectedTab) {
            Text("Monitor").tag(Tab.monitor)
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
        case .monitor:
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
        case .ports:
            PortsView(viewModel: portsViewModel)
                .transition(.opacity)
        }
    }
}