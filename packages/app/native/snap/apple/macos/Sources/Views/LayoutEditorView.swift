import SwiftUI

struct LayoutEditorView: View {
    let layout: SnapLayout
    @ObservedObject var viewModel: SnapViewModel
    @State private var layoutName: String
    @Environment(\.dismiss) private var dismiss

    init(layout: SnapLayout, viewModel: SnapViewModel) {
        self.layout = layout
        self.viewModel = viewModel
        _layoutName = State(initialValue: layout.name)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Edit Layout")
                    .font(.headline)
                Spacer()
                Button("Done") {
                    saveChanges()
                    dismiss()
                }
            }

            TextField("Layout Name", text: $layoutName)
                .textFieldStyle(.roundedBorder)

            Divider()

            Text("Windows in this layout:")
                .font(.subheadline)
                .foregroundColor(.secondary)

            List {
                ForEach(layout.windows) { rule in
                    WindowRuleRow(rule: rule)
                }
            }

            HStack {
                Spacer()
                Button(action: { viewModel.restoreLayout(id: layout.id) }) {
                    Label("Restore Layout", systemImage: "arrow.counterclockwise")
                }
            }
        }
        .padding()
        .frame(minWidth: 500, minHeight: 400)
    }

    private func saveChanges() {
        var updated = layout
        updated.name = layoutName
        viewModel.updateLayout(updated)
    }
}

struct WindowRuleRow: View {
    let rule: WindowRule

    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(rule.bundleIdentifier)
                    .font(.body)
                if let title = rule.title {
                    Text(title)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            Spacer()
            Text(zoneLabel)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }

    private var zoneLabel: String {
        if rule.zone == .leftHalf { return "Left Half" }
        if rule.zone == .rightHalf { return "Right Half" }
        if rule.zone == .topHalf { return "Top Half" }
        if rule.zone == .bottomHalf { return "Bottom Half" }
        if rule.zone == .topLeft { return "Top Left" }
        if rule.zone == .topRight { return "Top Right" }
        if rule.zone == .bottomLeft { return "Bottom Left" }
        if rule.zone == .bottomRight { return "Bottom Right" }
        if rule.zone == .maximized { return "Maximized" }
        if rule.zone == .centered { return "Centered" }
        return "Custom"
    }
}
