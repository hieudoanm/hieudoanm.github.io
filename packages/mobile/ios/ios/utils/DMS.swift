//
//  DMS.swift
//  ios
//
//  Created by Hieu Doan on 30/4/25.
//

func convertToDMS(coordinate: Double) -> String {
    let degrees = Int(coordinate)
    let minutes = Int((coordinate - Double(degrees)) * 60)
    let seconds = Int(((coordinate - Double(degrees)) * 60 - Double(minutes)) * 60)

    return "\(abs(degrees))°\(abs(minutes))'\(abs(seconds))\""
}
