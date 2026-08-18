import Testing
import Foundation
@testable import MixerCore

@Suite("AudioDevice")
struct AudioDeviceTests {

    @Test("init with defaults")
    func initWithDefaults() {
        let device = AudioDevice(id: 1, name: "MacBook Speakers")
        #expect(device.id == 1)
        #expect(device.name == "MacBook Speakers")
        #expect(device.isInput == false)
        #expect(device.isOutput == true)
        #expect(device.isDefault == false)
        #expect(device.volume == 1.0)
        #expect(device.isMuted == false)
    }

    @Test("init with custom values")
    func initWithCustom() {
        let device = AudioDevice(
            id: 42,
            name: "AirPods",
            isInput: true,
            isOutput: true,
            isDefault: true,
            volume: 0.5,
            isMuted: true
        )
        #expect(device.isInput == true)
        #expect(device.isOutput == true)
        #expect(device.isDefault == true)
        #expect(device.volume == 0.5)
        #expect(device.isMuted == true)
    }

    @Test("identifiable by id")
    func identifiable() {
        let device = AudioDevice(id: 99, name: "USB DAC")
        #expect(device.id == 99)
    }
}
