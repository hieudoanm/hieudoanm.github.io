import MacOSXCore
import SwiftUI

/// The Clipboard tab for searchable, one-click copy history with content filters.
struct ClipboardView: View {
    @ObservedObject var viewModel: ClipboardViewModel
    @ObservedObject private var store: ClipboardStore

    private enum Section: Hashable {
        case all
        case text
        case images
        case files
        case pinned
    }

    @State private var section: Section = .all

    init(viewModel: ClipboardViewModel) {
        self.viewModel = viewModel
        self.store = viewModel.store
    }

    private var displayedItems: [ClipboardItem] {
        store.search(viewModel.searchQuery).filter { item in
            switch section {
            case .all: return true
            case .text: return item.contentType == .text
            case .images: return item.contentType == .image
            case .files: return item.contentType == .file
            case .pinned: return item.pinned
            }
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            sectionPicker

            Divider()

            searchField

            Divider()

            if displayedItems.isEmpty {
                emptyState
            } else {
                ClipboardItemList(
                    items: displayedItems,
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

    private var sectionPicker: some View {
        Picker("Section", selection: $section) {
            Text("All").tag(Section.all)
            Text("Text").tag(Section.text)
            Text("Images").tag(Section.images)
            Text("Files").tag(Section.files)
            Text("Pinned").tag(Section.pinned)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .accessibilityLabel("Clipboard section")
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
            Text(emptyTitle)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 48)
    }

    private var emptyTitle: String {
        if !viewModel.searchQuery.isEmpty {
            return "No matching results"
        }
        switch section {
        case .all: return "Nothing copied yet"
        case .text: return "No text copied yet"
        case .images: return "No images copied yet"
        case .files: return "No files copied yet"
        case .pinned: return "Nothing pinned yet"
        }
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