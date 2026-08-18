import AppKit
import Carbon.HIToolbox

struct Shortcut {
    let keyCode: UInt32
    let modifiers: UInt32

    var displayString: String {
        var result = ""
        if modifiers & UInt32(cmdKey) != 0 { result += "⌘" }
        if modifiers & UInt32(shiftKey) != 0 { result += "⇧" }
        if modifiers & UInt32(controlKey) != 0 { result += "⌃" }
        if modifiers & UInt32(optionKey) != 0 { result += "⌥" }
        result += keyName
        return result
    }

    private var keyName: String {
        switch Int(keyCode) {
        case kVK_ANSI_1: return "1"
        case kVK_ANSI_2: return "2"
        case kVK_ANSI_3: return "3"
        case kVK_ANSI_4: return "4"
        case kVK_ANSI_5: return "5"
        case kVK_ANSI_S: return "S"
        case kVK_ANSI_D: return "D"
        case kVK_ANSI_W: return "W"
        case kVK_LeftArrow: return "←"
        case kVK_RightArrow: return "→"
        case kVK_UpArrow: return "↑"
        case kVK_DownArrow: return "↓"
        default: return "Key\(keyCode)"
        }
    }
}

typealias ShortcutHandler = () -> Void

final class ShortcutManager {
    static let shared = ShortcutManager()

    private var hotKeyRef: EventHotKeyRef?
    private var handlers: [UInt32: ShortcutHandler] = [:]
    private var eventHandler: EventHandlerRef?
    private var hotKeyID = EventHotKeyID()

    func register(shortcut: Shortcut, handler: @escaping ShortcutHandler, id: UInt32) {
        handlers[id] = handler

        hotKeyID.signature = OSType(0x534E4150) // "SNAP"
        hotKeyID.id = id

        var eventType = EventTypeSpec(
            eventClass: OSType(kEventClassKeyboard),
            eventKind: UInt32(kEventHotKeyPressed)
        )

        let handlerProc: EventHandlerUPP = { _, event, _ -> OSStatus in
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

            let id = hotKeyID.id
            DispatchQueue.main.async {
                ShortcutManager.shared.handlers[id]?()
            }
            return noErr
        }

        InstallEventHandler(
            GetEventDispatcherTarget(),
            handlerProc,
            1,
            &eventType,
            Unmanaged.passUnretained(self).toOpaque(),
            &eventHandler
        )

        RegisterEventHotKey(
            shortcut.keyCode,
            shortcut.modifiers,
            hotKeyID,
            GetEventDispatcherTarget(),
            0,
            &hotKeyRef
        )
    }

    func unregisterAll() {
        if let ref = hotKeyRef {
            UnregisterEventHotKey(ref)
        }
        if let handler = eventHandler {
            RemoveEventHandler(handler)
        }
        hotKeyRef = nil
        eventHandler = nil
        handlers.removeAll()
    }

    static func modifierFlags(from nsFlags: NSEvent.ModifierFlags) -> UInt32 {
        var flags: UInt32 = 0
        if nsFlags.contains(.command) { flags |= UInt32(cmdKey) }
        if nsFlags.contains(.shift) { flags |= UInt32(shiftKey) }
        if nsFlags.contains(.control) { flags |= UInt32(controlKey) }
        if nsFlags.contains(.option) { flags |= UInt32(optionKey) }
        return flags
    }
}
