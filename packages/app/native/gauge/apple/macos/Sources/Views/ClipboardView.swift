import GaugeCore
import SwiftUI

/// The Clipboard tab for searchable, one-click copy history.
struct ClipboardView: View {
    @ObservedObject var viewModel: ClipboardViewModel
    @ObservedObject private var store: ClipperStore

    init(viewModel: ClipboardViewModel) {
        self.viewModel = viewModel
        self.store = viewModel.store
    }

    private var filteredItems: [ClipperItem] {
        store.search(viewModel.searchQuery)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            searchField

            Divider()

            if filteredItems.isEmpty {
                emptyState
            } else {
                ClipperItemList(
                    items: filteredItems,
                    store: store,
                    onCopy: { viewModel.copyToClipboard($0) }
                )
            }

            Divider()

            footer
        }
        .padding(14)
    }

    private var header: some View {
        HStack {
            Label("Clipboard", systemImage: "doc.on.clipboard")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Text("\(store.totalCount) items")
                .font(.caption)
                .monospacedDigit()
                .foregroundColor(.secondary)
            Button(action: { viewModel.refresh() }) {
                Image(systemName: "arrow.clockwise")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Refresh")
            }
            .buttonStyle(.borderless)
            .help("Refresh")
        }
        .padding(.bottom, 16)
    }

    private var searchField: some View {
        HStack(spacing: 6) {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            TextField("Search clipboard history", text: $viewModel.searchQuery)
                .textFieldStyle(.plain)
            if !viewModel.searchQuery.isEmpty {
                Button {
                    viewModel.searchQuery = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                        .accessibilityLabel("Clear search")
                }
                .buttonStyle(.borderless)
                .help("Clear search")
            }
        }
        .padding(.vertical, 8)
    }

    private var emptyState: some View {
        VStack(spacing: 12) {
            Image(systemName: "doc.on.clipboard")
                .font(.system(size: 36))
                .foregroundColor(.secondary)
            Text(viewModel.searchQuery.isEmpty ? "Nothing copied yet" : "No matching results")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 48)
    }

    private var footer: some View {
        HStack {
            Text("\(store.pinnedCount) pinned")
                .font(.caption)
                .foregroundColor(.secondary)
            Spacer()
            Button("Clear Unpinned") {
                store.clearUnpinned()
            }
            .buttonStyle(.borderless)
            .font(.caption)
            .disabled(store.pinnedCount == store.totalCount)
            .help("Remove all unpinned items")
        }
        .padding(.top, 10)
    }
}

private struct ClipperItemList: View {
    let items: [ClipperItem]
    @ObservedObject var store: ClipperStore
    let onCopy: (ClipperItem) -> Void

    var body: some View {
        List(items) { item in
            ClipperItemRow(item: item, store: store, onCopy: onCopy)
        }
        .listStyle(.plain)
        .frame(maxHeight: 420)
    }
}

private struct ClipperItemRow: View {
    let item: ClipperItem
    @ObservedObject var store: ClipperStore
    let onCopy: (ClipperItem) -> Void

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 4) {
                    if item.pinned {
                        Image(systemName: "pin.fill")
                            .font(.caption2)
                            .foregroundColor(.orange)
                    }
                    Text(String(item.content.prefix(160)))
                        .lineLimit(3)
                        .font(.system(.caption, design: .monospaced))
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

            Spacer(minLength: 8)

            HStack(spacing: 6) {
                Button {
                    onCopy(item)
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