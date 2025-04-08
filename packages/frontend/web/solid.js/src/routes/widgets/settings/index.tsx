import {
  FaBrandsBluetooth,
  FaBrandsBluetoothB,
  FaBrandsNfcDirectional,
  FaBrandsNfcSymbol,
  FaRegularCirclePlay,
  FaRegularLightbulb,
  FaSolidBatteryFull,
  FaSolidBatteryQuarter,
  FaSolidBell,
  FaSolidBellSlash,
  FaSolidCirclePlay,
  FaSolidLightbulb,
  FaSolidLink,
  FaSolidLinkSlash,
  FaSolidLock,
  FaSolidMicrophoneLines,
  FaSolidMicrophoneLinesSlash,
  FaSolidMoon,
  FaSolidPhone,
  FaSolidPhoneSlash,
  FaSolidPlane,
  FaSolidPlaneSlash,
  FaSolidSignal,
  FaSolidSun,
  FaSolidUnlock,
  FaSolidWifi,
} from 'solid-icons/fa';
import { createSignal, JSX, Setter } from 'solid-js';

type Settings = {
  airplane: boolean;
  hotspot: boolean;
  wifi: boolean;
  bluetooth: boolean;
  cellular: boolean;
  flashlight: boolean;
  battery: boolean;
  notification: boolean;
  microphone: boolean;
  phone: boolean;
  screen: boolean;
  recording: boolean;
  nfc: boolean;
  focus: boolean;
};

const QuickSetting = ({
  setting,
  settings,
  setSettings,
  activeIcon = <></>,
  inactiveIcon = <></>,
}: {
  setting: keyof Settings;
  settings: Settings;
  setSettings: Setter<Settings>;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
}) => {
  return (
    <button
      onClick={() =>
        setSettings((previous: Settings) => {
          return {
            ...previous,
            [setting]: !previous[setting],
          };
        })
      }>
      <div
        class={`flex aspect-square w-16 items-center justify-center rounded-full ${settings[setting] ? 'bg-red-700' : 'bg-gray-900'} text-gray-100`}>
        {settings[setting] ? activeIcon : inactiveIcon}
      </div>
    </button>
  );
};

const SettingsPage = () => {
  const [settings, setSettings] = createSignal<Settings>({
    airplane: false,
    hotspot: false,
    wifi: false,
    bluetooth: false,
    cellular: false,
    flashlight: false,
    battery: false,
    notification: false,
    microphone: false,
    phone: false,
    screen: false,
    recording: false,
    nfc: false,
    focus: false,
  });

  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <div class="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-7">
          <div class="col-span-1">
            <QuickSetting
              setting="cellular"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidSignal class="text-3xl" />}
              inactiveIcon={<FaSolidSignal class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="airplane"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidPlane class="text-3xl" />}
              inactiveIcon={<FaSolidPlaneSlash class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="wifi"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidWifi class="text-3xl" />}
              inactiveIcon={<FaSolidWifi class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="hotspot"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidLink class="text-3xl" />}
              inactiveIcon={<FaSolidLinkSlash class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="bluetooth"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaBrandsBluetooth class="text-3xl" />}
              inactiveIcon={<FaBrandsBluetoothB class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="flashlight"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidLightbulb class="text-3xl" />}
              inactiveIcon={<FaRegularLightbulb class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="battery"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidBatteryQuarter class="text-3xl" />}
              inactiveIcon={<FaSolidBatteryFull class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="notification"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidBell class="text-3xl" />}
              inactiveIcon={<FaSolidBellSlash class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="microphone"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidMicrophoneLines class="text-3xl" />}
              inactiveIcon={<FaSolidMicrophoneLinesSlash class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="phone"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidPhone class="text-3xl" />}
              inactiveIcon={<FaSolidPhoneSlash class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="screen"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidUnlock class="text-3xl" />}
              inactiveIcon={<FaSolidLock class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="recording"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaSolidCirclePlay class="text-3xl" />}
              inactiveIcon={<FaRegularCirclePlay class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="nfc"
              settings={settings()}
              setSettings={setSettings}
              activeIcon={<FaBrandsNfcDirectional class="text-3xl" />}
              inactiveIcon={<FaBrandsNfcSymbol class="text-3xl" />}
            />
          </div>
          <div class="col-span-1">
            <QuickSetting
              setting="focus"
              settings={settings()}
              setSettings={setSettings}
              inactiveIcon={<FaSolidSun class="text-3xl" />}
              activeIcon={<FaSolidMoon class="text-3xl" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
