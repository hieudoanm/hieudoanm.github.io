//
//  ContentView.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//
import SwiftUI

// GitHub
let gitHubApp = ""
let gitHubUrl = "https://github.com/hieudoanm"

let twitterUrl = "https://x.com/hieudoanm"
let linkedInUrl = "https://www.linkedin.com/in/hieudoanm"

struct HomeView: View {
    var body: some View {
        NavigationStack {
            VStack {
                Text("hieu doan")
                    .padding(.bottom, 32)
                    .font(.title2)
                NavigationLink("apps", destination: AppsView())
                    .padding(.bottom, 32)
                    .font(.title2)
                Link("github", destination: URL(string: gitHubUrl)!)
                    .padding(.bottom, 2)
                    .font(.title2)
                Link("linkedin", destination: URL(string: linkedInUrl)!)
                    .padding(.bottom, 2)
                    .font(.title2)
                Link("x / twitter", destination: URL(string: twitterUrl)!)
                    .padding(.bottom, 0)
                    .font(.title2)
            }
        }
    }
}

#Preview {
    HomeView()
}
