import MixerCore
import Foundation
import Carbon

final class ShortcutManager {
    private var hotKeyRef: EventHotKeyRef?
    private var handler: (() -> Void)?

    func registerShortcut(keyCode: UInt32, modifiers: UInt32, handler: @escaping () -> Void) {
        self.handler = handler

        var hotKeyID = EventHotKeyID()
        hotKeyID.signature = 0x4D495821 // "MIX!"
        hotKeyID.id = 1

        let eventTypes: [EventTypeSpec] = [
            EventTypeSpec(eventClass: OSType(kEventClassKeyboard), eventKind: UInt32(kEventHotKeyPressed))
        ]

        let status = InstallEventHandler(
            GetApplicationEventTarget(),
            { _, event, _ in
                var hotKeyID = EventHotKeyID()
                GetEventParameter(
                    event,
                    EventParamName(kEventParamDirectObject),
                    EventParamType(typeEventHotKeyID),
                    nil,
                    MemoryLayout<EventHotKeyID>.size,
                    nil,
                    &hotKeyID
                )
                return noErr
            },
            eventTypes.count,
            eventTypes,
            nil,
            nil
        )

        guard status == noErr else { return }

        let registerStatus = RegisterEventHotKey(
            keyCode,
            modifiers,
            hotKeyID,
            GetApplicationEventTarget(),
            0,
            &hotKeyRef
        )

        _ = registerStatus
    }

    func unregisterShortcut() {
        if let hotKeyRef = hotKeyRef {
            UnregisterEventHotKey(hotKeyRef)
            self.hotKeyRef = nil
        }
    }

    deinit {
        unregisterShortcut()
    }
}
