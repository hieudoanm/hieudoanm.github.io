import MacOSXCore
import SwiftUI

struct MenuBarView: View {
    let clipboardViewModel: ClipboardViewModel
    let clockViewModel: ClockViewModel
    let ipViewModel: IPViewModel
    let viewModel: MemoryViewModel
    let networkViewModel: NetworkViewModel
    let portsViewModel: PortsViewModel
    let appsViewModel: AppsViewModel
    let workspacesViewModel: WorkspacesViewModel
    let homebrewViewModel: HomebrewViewModel
    let batteryViewModel: BatteryViewModel

    @Environment(\.openWindow) private var openWindow

    private enum Tab: Hashable {
        case battery
        case clipboard
        case clock
        case ip
        case memory
        case network
        case ports
        case front
        case workspaces
    }

    @State private var selectedTab: Tab = .memory
    @State private var showsDetails = false

    var body: some View {
        VStack(spacing: 0) {
            tabBar

            Divider()

            content
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                .frame(height: TabLayout.contentHeight)

            Divider()

            footer
        }
        .frame(width: TabLayout.width)
        .onAppear {
            viewModel.refresh()
            networkViewModel.start()
            portsViewModel.start()
        }
        .animation(.easeInOut(duration: 0.15), value: selectedTab)
        .animation(.easeInOut(duration: 0.15), value: showsDetails)
    }

    private var footer: some View {
        HStack {
            Button {
                openWindow(id: HomebrewView.windowID)
            } label: {
                Label("Applications Manager…", systemImage: "hammer")
            }
            .buttonStyle(.borderless)
            Spacer()
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
    }

    private var tabBar: some View {
        Picker("Tab", selection: $selectedTab) {
            Text("Battery").tag(Tab.battery)
            Text("Clipboard").tag(Tab.clipboard)
            Text("Clock").tag(Tab.clock)
            Text("Front").tag(Tab.front)
            Text("IP").tag(Tab.ip)
            Text("Memory").tag(Tab.memory)
            Text("Network").tag(Tab.network)
            Text("Ports").tag(Tab.ports)
            Text("Workspaces").tag(Tab.workspaces)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
    }

    @ViewBuilder
    private var content: some View {
        switch selectedTab {
        case .battery:
            BatteryView(viewModel: batteryViewModel)
                .transition(.opacity)
        case .clipboard:
            ClipboardView(viewModel: clipboardViewModel)
                .transition(.opacity)
        case .clock:
            ClockView(viewModel: clockViewModel)
                .transition(.opacity)
        case .ip:
            IPView(viewModel: ipViewModel)
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
        case .front:
            AppsView(viewModel: appsViewModel)
                .transition(.opacity)
        case .workspaces:
            WorkspacesView(viewModel: workspacesViewModel)
                .transition(.opacity)
        }
    }
}
