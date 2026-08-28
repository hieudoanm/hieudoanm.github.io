import SwiftUI

struct UnavailableView: View {
    let title: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            Text("Unable to read")
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}