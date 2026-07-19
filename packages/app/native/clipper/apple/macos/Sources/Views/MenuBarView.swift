import ClipperCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var store: ClipperStore
    @Binding var showHistory: Bool
    @Binding var showSettings: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("Clipper")
                    .font(.headline)
                Spacer()
                Text("\(store.totalCount) items")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal)
            .padding(.vertical, 8)

            Divider()

            Button {
                showHistory = true
                NSApp.activate(ignoringOtherApps: true)
            } label: {
                Label("Show History", systemImage: "clock.arrow.circlepath")
            }
            .keyboardShortcut("h")

            Divider()

            ForEach(store.items.prefix(5)) { item in
                Button {
                    PasteboardManager.shared.copyToClipboard(item.content)
                } label: {
                    Text(String(item.content.prefix(40)))
                        .lineLimit(1)
                }
            }

            if store.items.count > 5 {
                Button("Show All (\(store.items.count))...") {
                    showHistory = true
                    NSApp.activate(ignoringOtherApps: true)
                }
            }

            Divider()

            Button {
                showSettings = true
                NSApp.activate(ignoringOtherApps: true)
            } label: {
                Label("Settings", systemImage: "gear")
            }
            .keyboardShortcut(",")

            Divider()

            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .keyboardShortcut("q")
        }
        .frame(width: 280)
    }
}
