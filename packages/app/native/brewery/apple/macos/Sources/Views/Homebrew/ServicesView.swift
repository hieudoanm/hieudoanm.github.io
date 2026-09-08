import BreweryCore
import SwiftUI

struct ServicesView: View {
    @ObservedObject var viewModel: BreweryViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            if viewModel.services.isEmpty {
                emptyView
            } else {
                serviceList
            }
        }
        .navigationTitle("Services")
    }

    private var header: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("Services")
                    .font(.largeTitle.bold())
                Text("Manage Homebrew services")
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Button {
                Task { await viewModel.loadServices() }
            } label: {
                Label("Refresh", systemImage: "arrow.clockwise")
            }
            .disabled(viewModel.isLoading)
        }
        .padding(20)
    }

    private var serviceList: some View {
        List(viewModel.services) { service in
            HStack(spacing: 12) {
                Circle()
                    .fill(statusColor(service.status))
                    .frame(width: 10, height: 10)
                    .accessibilityHidden(true)

                Text(service.name)
                    .font(.headline)

                Text(statusLabel(service.status))
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Spacer()

                switch service.status {
                case .started:
                    Button("Stop") { Task { await viewModel.stopService(service.name) } }
                    Button("Restart") { Task { await viewModel.restartService(service.name) } }
                case .stopped, .unknown:
                    Button("Start") { Task { await viewModel.startService(service.name) } }
                case .error:
                    Button("Restart") { Task { await viewModel.restartService(service.name) } }
                }
            }
            .padding(.vertical, 4)
        }
    }

    private var emptyView: some View {
        VStack(spacing: 12) {
            Image(systemName: "gearshape.2")
                .font(.system(size: 44))
                .foregroundStyle(.secondary)
            Text("No services")
                .font(.headline)
            Text("Homebrew services registered on this machine will appear here.")
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func statusColor(_ status: BrewServiceInfo.ServiceStatus) -> Color {
        switch status {
        case .started: return .green
        case .stopped: return .gray
        case .error: return .red
        case .unknown: return .orange
        }
    }

    private func statusLabel(_ status: BrewServiceInfo.ServiceStatus) -> String {
        switch status {
        case .started: return "Running"
        case .stopped: return "Stopped"
        case .error: return "Error"
        case .unknown: return "Unknown"
        }
    }
}
