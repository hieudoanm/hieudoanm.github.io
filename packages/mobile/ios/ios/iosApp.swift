//
//  iosApp.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//

import SwiftUI

@main
struct iosApp: App {
    @StateObject private var motionDetector = MotionDetector(updateInterval: 0.01).started()
    var body: some Scene {
        WindowGroup {
            HomeView().environmentObject(motionDetector) // Inject it at the root level
        }
    }
}
