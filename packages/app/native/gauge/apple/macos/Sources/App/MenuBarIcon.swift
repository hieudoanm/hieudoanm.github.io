import GaugeCore
import SwiftUI

struct MenuBarIcon: View {
    @ObservedObject var viewModel: GaugeViewModel

    var body: some View {
        HStack(spacing: 6) {
            Text("🧠 \(viewModel.memoryPercentText)")
            Text("💾 \(viewModel.diskPercentText)")
        }
        .font(.system(size: 11, weight: .medium, design: .monospaced))
        .monospacedDigit()
    }
}