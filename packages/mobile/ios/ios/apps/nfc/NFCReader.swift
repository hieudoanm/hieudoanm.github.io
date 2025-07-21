//
//  NFCReader.swift
//  ios
//
//  Created by Hieu Doan on 30/4/25.
//

import CoreNFC
import SwiftUI

class NFCReader: NSObject, NFCNDEFReaderSessionDelegate {
    var session: NFCNDEFReaderSession?
    var detectedMessages = [NFCNDEFMessage]()

    func beginScanning() {
        guard NFCNDEFReaderSession.readingAvailable else {
            let alertController = UIAlertController(
                title: "Scanning Not Supported",
                message: "This device doesn't support tag scanning.",
                preferredStyle: .alert
            )
            alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
            return
        }

        session = NFCNDEFReaderSession(delegate: self, queue: nil, invalidateAfterFirstRead: true)
        session?.alertMessage = "Hold your iPhone near the item to learn more about it."
        session?.begin()
    }

    func readerSession(_: NFCNDEFReaderSession, didInvalidateWithError error: Error) {
        // Check the invalidation reason from the returned error.
        if let readerError = error as? NFCReaderError {
            // Show an alert when the invalidation reason is not because of a
            // successful read during a single-tag read session, or because the
            // user canceled a multiple-tag read session from the UI or
            // programmatically using the invalidate method call.
            if readerError.code != .readerSessionInvalidationErrorFirstNDEFTagRead,
               readerError.code != .readerSessionInvalidationErrorUserCanceled
            {
                let alertController = UIAlertController(
                    title: "Session Invalidated",
                    message: error.localizedDescription,
                    preferredStyle: .alert
                )
                alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                DispatchQueue.main.async {
                    print("NFC Session Invalidated: \(error.localizedDescription)")
                }
            }
        }

        // To read new tags, a new session instance is required.
        session = nil
    }

    func readerSession(_: NFCNDEFReaderSession, didDetectNDEFs messages: [NFCNDEFMessage]) {
        DispatchQueue.main.async {
            // Process detected NFCNDEFMessage objects.
            self.detectedMessages.append(contentsOf: messages)
        }
    }

    func beginWrite(_: Any) {
        session = NFCNDEFReaderSession(delegate: self, queue: nil, invalidateAfterFirstRead: false)
        session?.alertMessage = "Hold your iPhone near an NDEF tag to write the message."
        session?.begin()
    }
}
