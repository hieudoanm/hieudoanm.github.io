import MacOSXCore
import SwiftUI

struct MenuBarView: View {
    let clipboardViewModel: ClipboardViewModel
    let clockViewModel: ClockViewModel
    let memoryViewModel: MemoryViewModel
    let batteryViewModel: BatteryViewModel
    let networkViewModel: NetworkViewModel
    let portsViewModel: PortsViewModel
    let ipViewModel: IPViewModel
    let appsViewModel: AppsViewModel
    let workspacesViewModel: WorkspacesViewModel

    @Environment(\.openWindow) private var openWindow

    private enum Tab: Hashable {
        case clipboard
        case clock
        case resources
        case network
        case apps
    }

    @State private var selectedTab: Tab = .resources

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
            memoryViewModel.refresh()
        }
        .animation(.easeInOut(duration: 0.15), value: selectedTab)
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
            Text("Clipboard").tag(Tab.clipboard)
            Text("Clock").tag(Tab.clock)
            Text("Resources").tag(Tab.resources)
            Text("Network").tag(Tab.network)
            Text("Apps").tag(Tab.apps)
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
        case .clock:
            ClockView(viewModel: clockViewModel)
                .transition(.opacity)
        case .resources:
            ResourcesView(
                memoryViewModel: memoryViewModel,
                batteryViewModel: batteryViewModel
            )
            .transition(.opacity)
        case .network:
            NetworkView(
                networkViewModel: networkViewModel,
                portsViewModel: portsViewModel,
                ipViewModel: ipViewModel
            )
            .transition(.opacity)
        case .apps:
            AppsView(
                appsViewModel: appsViewModel,
                workspacesViewModel: workspacesViewModel
            )
            .transition(.opacity)
        }
    }
}