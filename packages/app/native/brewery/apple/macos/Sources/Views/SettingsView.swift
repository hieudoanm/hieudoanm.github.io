import BreweryCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: BreweryViewModel

    var body: some View {
        TabView {
            generalTab
                .tabItem { Label("General", systemImage: "gearshape") }
            diagnosticsTab
                .tabItem { Label("Diagnostics", systemImage: "stethoscope") }
        }
        .frame(width: 460, height: 320)
        .formStyle(.grouped)
    }

    private var generalTab: some View {
        Form {
            Text("Settings")
                .font(.title.bold())
            Toggle("Launch at Login", isOn: launchAtLoginBinding)
        }
        .padding()
    }

    private var diagnosticsTab: some View {
        Form {
            Text("Diagnostics")
                .font(.title.bold())
            LabeledContent("Homebrew", value: viewModel.isHomebrewAvailable ? "Available" : "Not found")
            if !viewModel.homebrewVersion.isEmpty {
                LabeledContent("Homebrew version", value: viewModel.homebrewVersion)
            }
            LabeledContent("Architecture", value: architecture)
            LabeledContent("Brewery version", value: "0.0.1")
        }
        .padding()
    }

    private var launchAtLoginBinding: Binding<Bool> {
        Binding(
            get: { viewModel.launchAtLogin },
            set: { viewModel.updateLaunchAtLogin($0) }
        )
    }

    private var architecture: String {
        #if arch(arm64)
        return "Apple Silicon"
        #else
        return "Intel"
        #endif
    }
}
