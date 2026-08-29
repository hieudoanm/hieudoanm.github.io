import BreweryCore
import SwiftUI

struct ContentView: View {
    @ObservedObject var viewModel: BreweryViewModel

    var body: some View {
        Group {
            if viewModel.homebrewMissing {
                HomebrewMissingView(onRetry: { Task { await viewModel.checkHomebrew() } })
            } else {
                NavigationSplitView {
                    SidebarView(viewModel: viewModel)
                } detail: {
                    detailView
                }
            }
        }
        .task {
            await viewModel.start()
        }
        .alert("Brewery", isPresented: alertPresented) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(viewModel.errorMessage ?? "")
        }
    }

    @ViewBuilder
    private var detailView: some View {
        switch viewModel.selectedSection {
        case .discover:
            DiscoverView(viewModel: viewModel)
        case .installed:
            InstalledView(viewModel: viewModel)
        case .updates:
            UpdatesView(viewModel: viewModel)
        case .services:
            ServicesView(viewModel: viewModel)
        }
    }

    private var alertPresented: Binding<Bool> {
        Binding(
            get: { viewModel.errorMessage != nil },
            set: { if !$0 { viewModel.errorMessage = nil } }
        )
    }
}
