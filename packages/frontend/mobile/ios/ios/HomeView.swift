//
//  ContentView.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//
import SwiftUI

let gitHubUrl = "https://github.com/hieudoanm"
let twitterUrl = "https://x.com/hieudoanm"
let linkedInUrl = "https://www.linkedin.com/in/hieudoanm"

struct HomeView: View {
    var body: some View {
        NavigationStack {
            VStack {
                Text("Hieu Doan")
                    .padding(.bottom, 16)
                NavigationLink("Apps", destination: AppsView()).padding(.bottom, 16)
                Link("GitHub", destination: URL(string: gitHubUrl)!)
                Link("Twitter", destination: URL(string: twitterUrl)!)
                Link("LinkedIn", destination: URL(string: linkedInUrl)!)
            }
        }
    }
}

#Preview {
    HomeView()
}
