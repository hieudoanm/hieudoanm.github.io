import SwiftUI

struct LayoutListView: View {
    @ObservedObject var viewModel: SnapViewModel
    @State private var showingNewLayout = false
    @State private var newLayoutName = ""
    @State private var editingLayout: SnapLayout?

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("Saved Layouts")
                    .font(.headline)
                Spacer()
                Button(action: { showingNewLayout = true }) {
                    Label("New", systemImage: "plus")
                }
            }
            .padding()

            Divider()

            if viewModel.layouts.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "rectangle.on.rectangle.angled")
                        .font(.system(size: 48))
                        .foregroundColor(.secondary)
                    Text("No saved layouts")
                        .foregroundColor(.secondary)
                    Text("Save your current window arrangement to create a layout.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                List {
                    ForEach(viewModel.layouts) { layout in
                        LayoutRow(layout: layout, viewModel: viewModel)
                            .contextMenu {
                                Button("Restore") {
                                    viewModel.restoreLayout(id: layout.id)
                                }
                                Button("Edit") {
                                    editingLayout = layout
                                }
                                Divider()
                                Button("Delete", role: .destructive) {
                                    viewModel.deleteLayout(id: layout.id)
                                }
                            }
                    }
                    .onMove { source, destination in
                        viewModel.moveLayout(from: source, to: destination)
                    }
                }
            }
        }
        .frame(minWidth: 400, minHeight: 300)
        .alert("New Layout", isPresented: $showingNewLayout) {
            TextField("Layout name", text: $newLayoutName)
            Button("Save") {
                guard !newLayoutName.isEmpty else { return }
                viewModel.saveCurrentLayout(name: newLayoutName)
                newLayoutName = ""
            }
            Button("Cancel", role: .cancel) { newLayoutName = "" }
        } message: {
            Text("Enter a name for this layout")
        }
        .sheet(item: $editingLayout) { layout in
            LayoutEditorView(layout: layout, viewModel: viewModel)
        }
    }
}

struct LayoutRow: View {
    let layout: SnapLayout
    let viewModel: SnapViewModel

    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(layout.name)
                    .font(.body)
                Text("\(layout.windows.count) windows")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            Spacer()
            Button(action: { viewModel.restoreLayout(id: layout.id) }) {
                Label("Restore", systemImage: "arrow.counterclockwise")
            }
        }
    }
}
