import SnapCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var viewModel: SnapViewModel
    @State private var showingSaveDialog = false
    @State private var newLayoutName = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            if !viewModel.layouts.isEmpty {
                ForEach(viewModel.layouts) { layout in
                    Button(action: { viewModel.restoreLayout(id: layout.id) }) {
                        HStack {
                            Text(layout.name)
                            Spacer()
                            Text("\(layout.windows.count) windows")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                }

                Divider()
                    .padding(.vertical, 4)
            }

            snapButtons

            Divider()
                .padding(.vertical, 4)

            Button(action: { showingSaveDialog = true }) {
                Label("Save Current Layout", systemImage: "square.and.arrow.down")
            }
            .buttonStyle(.plain)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)

            Divider()
                .padding(.vertical, 4)

            Button(action: { viewModel.openSettings() }) {
                Label("Settings", systemImage: "gear")
            }
            .buttonStyle(.plain)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)

            Button(action: { NSApplication.shared.terminate(nil) }) {
                Label("Quit", systemImage: "power")
            }
            .buttonStyle(.plain)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
        }
        .frame(width: 280)
        .alert("Save Layout", isPresented: $showingSaveDialog) {
            TextField("Layout name", text: $newLayoutName)
            Button("Save") {
                guard !newLayoutName.isEmpty else { return }
                viewModel.saveCurrentLayout(name: newLayoutName)
                newLayoutName = ""
            }
            Button("Cancel", role: .cancel) {
                newLayoutName = ""
            }
        } message: {
            Text("Enter a name for this layout")
        }
    }

    private var snapButtons: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Snap Current Window")
                .font(.caption)
                .foregroundColor(.secondary)
                .padding(.horizontal, 12)
                .padding(.top, 4)

            HStack {
                snapButton(".Left Half", zone: .leftHalf, icon: "rectangle.split.2x1")
                snapButton("Right Half", zone: .rightHalf, icon: "rectangle.split.2x1")
            }
            .padding(.horizontal, 8)

            HStack {
                snapButton("Top Left", zone: .topLeft, icon: "rectangle.split.2x2")
                snapButton("Top Right", zone: .topRight, icon: "rectangle.split.2x2")
            }
            .padding(.horizontal, 8)

            HStack {
                snapButton("Bottom Left", zone: .bottomLeft, icon: "rectangle.split.2x2")
                snapButton("Bottom Right", zone: .bottomRight, icon: "rectangle.split.2x2")
            }
            .padding(.horizontal, 8)

            HStack {
                snapButton("Maximize", zone: .maximized, icon: "rectangle.expand.vertical")
                snapButton("Center", zone: .centered, icon: "rectangle.center.inset.filled")
            }
            .padding(.horizontal, 8)
            .padding(.bottom, 4)
        }
    }

    private func snapButton(_ label: String, zone: NormalizedRect, icon: String) -> some View {
        Button(action: { viewModel.snapWindow(to: zone) }) {
            Label(label, systemImage: icon)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .buttonStyle(.plain)
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
    }
}
