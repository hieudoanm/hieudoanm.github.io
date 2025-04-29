//
//  CompassView.swift
//  ios
//
//  Created by Hieu Doan on 23/4/25.
//

import Combine
import CoreLocation
import Foundation
import SwiftUI

class CompassHeading: NSObject, ObservableObject, CLLocationManagerDelegate {
    var objectWillChange = PassthroughSubject<Void, Never>()
    var degrees: Double = .zero {
        didSet {
            objectWillChange.send()
        }
    }

    var label: String {
        switch degrees.truncatingRemainder(dividingBy: 360) {
        case -22.5 ..< 22.5:
            return "N"
        case 22.5 ..< 67.5:
            return "NE"
        case 67.5 ..< 112.5:
            return "E"
        case 112.5 ..< 157.5:
            return "SE"
        case 157.5 ..< 202.5:
            return "S"
        case 202.5 ..< 247.5:
            return "SW"
        case 247.5 ..< 292.5:
            return "W"
        case 292.5 ..< 337.5:
            return "NW"
        default:
            return "N"
        }
    }

    private let locationManager: CLLocationManager

    override init() {
        locationManager = CLLocationManager()
        super.init()

        locationManager.delegate = self
        setup()
    }

    private func setup() {
        locationManager.requestWhenInUseAuthorization()

        if CLLocationManager.headingAvailable() {
            locationManager.startUpdatingLocation()
            locationManager.startUpdatingHeading()
        }
    }

    func locationManager(_: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        degrees = -1 * newHeading.magneticHeading
    }
}

struct Marker: Hashable {
    let degrees: Double
    let label: String

    init(degrees: Double, label: String = "") {
        self.degrees = degrees
        self.label = label
    }

    func degreeText() -> String {
        return String(format: "%.0f", degrees)
    }

    static func markers() -> [Marker] {
        return [
            Marker(degrees: 0, label: "N"),
            Marker(degrees: 30),
            Marker(degrees: 60),
            Marker(degrees: 90, label: "E"),
            Marker(degrees: 120),
            Marker(degrees: 150),
            Marker(degrees: 180, label: "S"),
            Marker(degrees: 210),
            Marker(degrees: 240),
            Marker(degrees: 270, label: "W"),
            Marker(degrees: 300),
            Marker(degrees: 330),
        ]
    }
}

struct CompassMarkerView: View {
    let marker: Marker
    let compassDegress: Double

    var body: some View {
        VStack {
            Text(marker.degreeText())
                .fontWeight(.light)
                .rotationEffect(self.textAngle())

            Capsule()
                .frame(width: self.capsuleWidth(),
                       height: self.capsuleHeight())
                .foregroundColor(self.capsuleColor())

            Text(marker.label)
                .fontWeight(.bold)
                .rotationEffect(self.textAngle())
                .padding(.bottom, 180)
        }.rotationEffect(Angle(degrees: marker.degrees))
    }

    private func capsuleWidth() -> CGFloat {
        return marker.degrees == 0 ? 7 : 3
    }

    private func capsuleHeight() -> CGFloat {
        return marker.degrees == 0 ? 45 : 30
    }

    private func capsuleColor() -> Color {
        return marker.degrees == 0 ? .red : .gray
    }

    private func textAngle() -> Angle {
        return Angle(degrees: -compassDegress - marker.degrees)
    }
}

struct CompassView: View {
    @ObservedObject var compassHeading = CompassHeading()
    @StateObject var locationManager = LocationManager()

    var body: some View {
        VStack {
            Capsule()
                .frame(width: 5,
                       height: 50)
            ZStack {
                ForEach(Marker.markers(), id: \.self) { marker in
                    CompassMarkerView(marker: marker,
                                      compassDegress: self.compassHeading.degrees)
                }
            }
            .frame(width: 300,
                   height: 300)
            .rotationEffect(Angle(degrees: self.compassHeading.degrees))
            Text(String(format: "%.0f", -self.compassHeading.degrees)).font(.largeTitle) + Text("° ")
                .font(.largeTitle) + Text(self.compassHeading.label).font(.largeTitle)
            if let lat = locationManager.latitude,
               let lon = locationManager.longitude
            {
                Text("\(convertToDMS(coordinate: lat)) \(convertToDMS(coordinate: lon))")
            } else {
                Text("Getting coordinates...")
            }
            if let city = locationManager.city,
               let country = locationManager.country
            {
                Text("\(city), \(country)")
            } else {
                Text("Getting location...")
            }
            if let altitude = locationManager.altitude {
                Text("Elevation: \(altitude, specifier: "%.0f") m")
            } else {
                Text("Getting elevation...")
            }
        }
    }
}

#Preview {
    CompassView()
}
