import MacOSXCore
import SwiftUI

struct ClipboardItemList: View {
    let items: [ClipboardItem]
    @ObservedObject var store: ClipboardStore
    let onCopy: (ClipboardItem) -> Void

    var body: some View {
        List(items) { item in
            ClipboardItemRow(item: item, store: store, onCopy: onCopy)
        }
        .listStyle(.plain)
        .frame(maxHeight: .infinity)
    }
}

struct ClipboardItemRow: View {
    let item: ClipboardItem
    @ObservedObject var store: ClipboardStore
    let onCopy: (ClipboardItem) -> Void

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