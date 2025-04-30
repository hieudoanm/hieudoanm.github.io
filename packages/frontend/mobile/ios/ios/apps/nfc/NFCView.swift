//
//  NFCView.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//

import SwiftUI

struct NFCView: View {
    let nfcReader = NFCReader()

    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                Button("Read") {
                    nfcReader.beginScanning()
                }
                NavigationLink("Write", destination: NFCWriteView())
            }
        }
    }
}

#Preview {
    NFCView()
}
