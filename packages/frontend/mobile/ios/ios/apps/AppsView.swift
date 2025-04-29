//
//  AppsView.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//
import SwiftUI

struct AppsView: View {
    var body: some View {
        NavigationStack {
            VStack {
                NavigationLink("Camera", destination: CameraView())
                    .padding(.bottom, 16)
                    .font(.title2)
                NavigationLink("Compass", destination: CompassView())
                    .padding(.bottom, 16)
                    .font(.title2)
                NavigationLink("Level", destination: LevelView())
                    .padding(.bottom, 16)
                    .font(.title2)
                NavigationLink("NFC", destination: NFCView())
                    .padding(.bottom, 16)
                    .font(.title2)
            }
        }
    }
}

#Preview {
    AppsView()
}
