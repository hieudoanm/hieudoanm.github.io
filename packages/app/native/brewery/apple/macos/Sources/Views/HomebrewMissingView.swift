import BreweryCore
import SwiftUI

struct HomebrewMissingView: View {
    let onRetry: () -> Void

    var body: some View {
        VStack(spacing: 14) {
            Image(systemName: "exclamationmark.triangle")
                .font(.system(size: 48))
                .foregroundStyle(.orange)
            Text("Homebrew not found")
                .font(.title.bold())
            Text("Brewery requires Homebrew to manage packages.")
                .foregroundStyle(.secondary)
            HStack(spacing: 12) {
                Button("Retry", action: onRetry)
                Link("Learn More", destination: URL(string: "https://brew.sh")!)
            }
            .padding(.top, 8)
        }
        .padding(40)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
