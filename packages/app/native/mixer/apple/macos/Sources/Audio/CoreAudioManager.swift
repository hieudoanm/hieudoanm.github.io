import Foundation
import CoreAudio
import AudioToolbox

final class CoreAudioManager {
    private var audioObjectIDs: [AudioObjectID] = []

    func getAudioDevices() -> [AudioObjectID] {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioHardwarePropertyDevices,
            mScope: kAudioObjectPropertyScopeGlobal,
            mElement: kAudioObjectPropertyElementMain
        )

        var dataSize: UInt32 = 0
        let status = AudioObjectGetPropertyDataSize(
            AudioObjectID(kAudioObjectSystemObject),
            &propertyAddress,
            0, nil,
            &dataSize
        )

        guard status == noErr else { return [] }

        let deviceCount = Int(dataSize) / MemoryLayout<AudioObjectID>.size
        var deviceIDs = [AudioObjectID](repeating: 0, count: deviceCount)

        let status2 = AudioObjectGetPropertyData(
            AudioObjectID(kAudioObjectSystemObject),
            &propertyAddress,
            0, nil,
            &dataSize,
            &deviceIDs
        )

        guard status2 == noErr else { return [] }
        return deviceIDs
    }

    func getDefaultOutputDevice() -> AudioObjectID? {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioHardwarePropertyDefaultOutputDevice,
            mScope: kAudioObjectPropertyScopeGlobal,
            mElement: kAudioObjectPropertyElementMain
        )

        var deviceID: AudioObjectID = 0
        var dataSize = UInt32(MemoryLayout<AudioObjectID>.size)

        let status = AudioObjectGetPropertyData(
            AudioObjectID(kAudioObjectSystemObject),
            &propertyAddress,
            0, nil,
            &dataSize,
            &deviceID
        )

        guard status == noErr, deviceID != kAudioObjectUnknown else { return nil }
        return deviceID
    }

    func getDeviceName(deviceID: AudioObjectID) -> String? {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioDevicePropertyDeviceNameCFString,
            mScope: kAudioObjectPropertyScopeGlobal,
            mElement: kAudioObjectPropertyElementMain
        )

        var name: CFString = "" as CFString
        var dataSize = UInt32(MemoryLayout<CFString>.size)

        let status = AudioObjectGetPropertyData(
            deviceID,
            &propertyAddress,
            0, nil,
            &dataSize,
            &name
        )

        guard status == noErr else { return nil }
        return name as String
    }

    func getDeviceVolume(deviceID: AudioObjectID) -> Float? {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioDevicePropertyVolumeScalar,
            mScope: kAudioDevicePropertyScopeOutput,
            mElement: kAudioObjectPropertyElementMain
        )

        var volume: Float32 = 0
        var dataSize = UInt32(MemoryLayout<Float32>.size)

        let status = AudioObjectGetPropertyData(
            deviceID,
            &propertyAddress,
            0, nil,
            &dataSize,
            &volume
        )

        guard status == noErr else { return nil }
        return volume
    }

    func setDeviceVolume(deviceID: AudioObjectID, volume: Float) {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioDevicePropertyVolumeScalar,
            mScope: kAudioDevicePropertyScopeOutput,
            mElement: kAudioObjectPropertyElementMain
        )

        var vol = volume
        AudioObjectSetPropertyData(
            deviceID,
            &propertyAddress,
            0, nil,
            UInt32(MemoryLayout<Float32>.size),
            &vol
        )
    }

    func isDeviceMuted(deviceID: AudioObjectID) -> Bool? {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioDevicePropertyMute,
            mScope: kAudioDevicePropertyScopeOutput,
            mElement: kAudioObjectPropertyElementMain
        )

        var muted: UInt32 = 0
        var dataSize = UInt32(MemoryLayout<UInt32>.size)

        let status = AudioObjectGetPropertyData(
            deviceID,
            &propertyAddress,
            0, nil,
            &dataSize,
            &muted
        )

        guard status == noErr else { return nil }
        return muted != 0
    }

    func setDeviceMuted(deviceID: AudioObjectID, muted: Bool) {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioDevicePropertyMute,
            mScope: kAudioDevicePropertyScopeOutput,
            mElement: kAudioObjectPropertyElementMain
        )

        var mutedValue: UInt32 = muted ? 1 : 0
        AudioObjectSetPropertyData(
            deviceID,
            &propertyAddress,
            0, nil,
            UInt32(MemoryLayout<UInt32>.size),
            &mutedValue
        )
    }

    func getStreamVolume(deviceID: AudioObjectID, streamID: AudioObjectID) -> Float? {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioLevelControlPropertyScalarValue,
            mScope: kAudioObjectPropertyScopeGlobal,
            mElement: kAudioObjectPropertyElementMain
        )

        var volume: Float32 = 0
        var dataSize = UInt32(MemoryLayout<Float32>.size)

        let status = AudioObjectGetPropertyData(
            streamID,
            &propertyAddress,
            0, nil,
            &dataSize,
            &volume
        )

        guard status == noErr else { return nil }
        return volume
    }

    func setStreamVolume(streamID: AudioObjectID, volume: Float) {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioLevelControlPropertyScalarValue,
            mScope: kAudioObjectPropertyScopeGlobal,
            mElement: kAudioObjectPropertyElementMain
        )

        var vol = volume
        AudioObjectSetPropertyData(
            streamID,
            &propertyAddress,
            0, nil,
            UInt32(MemoryLayout<Float32>.size),
            &vol
        )
    }

    func getOutputStreams(deviceID: AudioObjectID) -> [AudioObjectID] {
        var propertyAddress = AudioObjectPropertyAddress(
            mSelector: kAudioDevicePropertyStreams,
            mScope: kAudioDevicePropertyScopeOutput,
            mElement: kAudioObjectPropertyElementMain
        )

        var dataSize: UInt32 = 0
        let status = AudioObjectGetPropertyDataSize(
            deviceID,
            &propertyAddress,
            0, nil,
            &dataSize
        )

        guard status == noErr else { return [] }

        let streamCount = Int(dataSize) / MemoryLayout<AudioObjectID>.size
        var streamIDs = [AudioObjectID](repeating: 0, count: streamCount)

        let status2 = AudioObjectGetPropertyData(
            deviceID,
            &propertyAddress,
            0, nil,
            &dataSize,
            &streamIDs
        )

        guard status2 == noErr else { return [] }
        return streamIDs
    }
}
