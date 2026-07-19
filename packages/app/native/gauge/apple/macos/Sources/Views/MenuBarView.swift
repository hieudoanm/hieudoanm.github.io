import GaugeCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var viewModel: GaugeViewModel
    @State private var showsDetails = false

    var body: some View {
        Group {
            if showsDetails {
                DetailsView(viewModel: viewModel) {
                    showsDetails = false
                }
                .transition(.move(edge: .leading).combined(with: .opacity))
            } else {
                SmallView(viewModel: viewModel) {
                    showsDetails = true
                }
                .transition(.move(edge: .trailing).combined(with: .opacity))
            }
        }
        .frame(width: 320)
        .onAppear {
            viewModel.refresh()
        }
        .animation(.easeInOut(duration: 0.15), value: showsDetails)
    }
}