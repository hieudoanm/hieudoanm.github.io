import MacOSXCore
import SwiftUI

struct MenuBarIcon: View {
    @ObservedObject var viewModel: MemoryViewModel

    var body: some View {
        HStack(spacing: 6) {
            HStack(spacing: 3) {
                Image(systemName: "cpu")
                Text(viewModel.cpuPercentText)
            }
            HStack(spacing: 3) {
                Image(systemName: "internaldrive")
                Text(viewModel.menuBarDiskText)
            }
        }
        .font(.system(size: 11, weight: .medium, design: .monospaced))
        .monospacedDigit()
        .fixedSize()
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(viewModel.cpuPercentText) CPU, \(viewModel.menuBarDiskText) disk")
        .accessibilityAddTraits(.updatesFrequently)
    }
}