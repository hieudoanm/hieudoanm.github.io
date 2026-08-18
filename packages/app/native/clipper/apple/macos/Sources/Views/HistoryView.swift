import SwiftUI

struct HistoryView: View {
    @ObservedObject var store: ClipperStore
    @State private var searchText = ""

    private var filteredItems: [ClipperItem] {
        store.search(searchText)
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Label("Clipboard History", systemImage: "clock.arrow.circlepath")
                    .font(.title2.bold())
                Spacer()
                Text("\(store.pinnedCount) pinned")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding()

            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.secondary)
                TextField("Search...", text: $searchText)
                    .textFieldStyle(.plain)
                if !searchText.isEmpty {
                    Button {
                        searchText = ""
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.secondary)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(8)
            .background(Color(.controlBackgroundColor))
            .cornerRadius(8)
            .padding(.horizontal)

            Divider()
                .padding(.vertical, 8)

            if filteredItems.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "doc.on.clipboard")
                        .font(.system(size: 40))
                        .foregroundColor(.secondary)
                    Text(searchText.isEmpty ? "No clipboard history" : "No matching results")
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                List {
                    ForEach(filteredItems) { item in
                        ClipperItemRow(item: item, store: store)
                    }
                }
                .listStyle(.plain)
            }

            Divider()

            HStack {
                Text("\(store.totalCount) items")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Spacer()
                Button("Clear Unpinned") {
                    store.clearUnpinned()
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
            .padding()
        }
        .frame(width: 450, height: 500)
    }
}

struct ClipperItemRow: View {
    let item: ClipperItem
    @ObservedObject var store: ClipperStore

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    if item.pinned {
                        Image(systemName: "pin.fill")
                            .font(.caption2)
                            .foregroundColor(.orange)
                    }
                    Text(String(item.content.prefix(200)))
                        .lineLimit(3)
                        .font(.system(.body, design: .monospaced))
                }
                HStack(spacing: 8) {
                    Text(item.createdAt, style: .relative)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("\(item.copiedCount)x copied")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            HStack(spacing: 6) {
                Button {
                    PasteboardManager.shared.copyToClipboard(item.content)
                } label: {
                    Image(systemName: "doc.on.doc")
                }
                .help("Copy to clipboard")

                Button {
                    store.togglePin(item)
                } label: {
                    Image(systemName: item.pinned ? "pin.slash" : "pin")
                }
                .help(item.pinned ? "Unpin" : "Pin")

                Button {
                    store.delete(item)
                } label: {
                    Image(systemName: "trash")
                }
                .help("Delete")
            }
            .buttonStyle(.plain)
            .foregroundColor(.secondary)
        }
        .padding(.vertical, 4)
    }
}
