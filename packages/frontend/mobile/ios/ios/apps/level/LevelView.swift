//
//  LevelView.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//

import SwiftUI

struct OrientationDataView_Previews: PreviewProvider {
    @StateObject private static var motionDetector = MotionDetector(updateInterval: 0.01).started()

    static var previews: some View {
        LevelView()

            .environmentObject(motionDetector)
    }
}

struct LevelView: View {
    @EnvironmentObject var detector: MotionDetector

    var rollString: String {
        detector.roll.describeAsFixedLengthString()
    }

    var pitchString: String {
        detector.pitch.describeAsFixedLengthString()
    }

    var body: some View {
        VStack {
            Text("Horizontal: " + rollString)

                .font(.system(.body, design: .monospaced))

            Text("Vertical: " + pitchString)

                .font(.system(.body, design: .monospaced))
        }
    }
}

#Preview {
    LevelView()
}
