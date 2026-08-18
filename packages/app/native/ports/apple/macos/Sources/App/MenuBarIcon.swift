import PortsCore
import SwiftUI

struct MenuBarIcon: View {
    @ObservedObject var viewModel: PortsViewModel

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: "cable.connector")
            Text(String(viewModel.listeningCount))
                .font(.system(.caption, design: .monospaced, weight: .medium))
                .monospacedDigit()
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Ports, \(viewModel.listeningCount) listening ports")
        .onAppear {
            viewModel.start()
        }
    }
}