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
                NavigationLink("Compass", destination: CompassView())
                NavigationLink("Level", destination: LevelView())
                NavigationLink("NFC", destination: NFCView())
            }
        }
    }
}

#Preview {
    AppsView()
}
