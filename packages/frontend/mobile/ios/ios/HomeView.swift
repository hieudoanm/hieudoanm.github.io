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
                    .font(.title2)
                NavigationLink("Apps", destination: AppsView())
                    .padding(.bottom, 16)
                    .font(.title2)
                Link("GitHub", destination: URL(string: gitHubUrl)!)
                    .padding(.bottom, 8)
                    .font(.title2)
                Link("Twitter", destination: URL(string: twitterUrl)!)
                    .padding(.bottom, 8)
                    .font(.title2)
                Link("LinkedIn", destination: URL(string: linkedInUrl)!)
                    .padding(.bottom, 0)
                    .font(.title2)
            }
        }
    }
}

#Preview {
    HomeView()
}
