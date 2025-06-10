import { NextPage } from 'next';
import { Dispatch, FC, JSX, SetStateAction, useState } from 'react';
import {
  FaBatteryFull,
  FaBatteryQuarter,
  FaBell,
  FaBellSlash,
  FaBluetooth,
  FaBluetoothB,
  FaCirclePlay,
  FaLightbulb,
  FaLink,
  FaLinkSlash,
  FaLock,
  FaMicrophoneLines,
  FaMicrophoneLinesSlash,
  FaMoon,
  FaNfcDirectional,
  FaNfcSymbol,
  FaPhone,
  FaPhoneSlash,
  FaPlane,
  FaPlaneSlash,
  FaRegCirclePlay,
  FaRegLightbulb,
  FaSignal,
  FaSun,
  FaUnlock,
  FaWifi,
} from 'react-icons/fa6';

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

const QuickSetting: FC<{
  setting: keyof Settings;
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
}> = ({
  setting,
  settings,
  setSettings,
  activeIcon = <></>,
  inactiveIcon = <></>,
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
        className={`flex aspect-square w-16 items-center justify-center rounded-full ${settings[setting] ? 'bg-red-700' : 'bg-neutral-900'} text-neutral-100`}>
        {settings[setting] ? activeIcon : inactiveIcon}
      </div>
    </button>
  );
};

const SettingsPage: NextPage = () => {
  const [settings, setSettings] = useState<Settings>({
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
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex h-full items-center justify-center">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-7">
          <div className="col-span-1">
            <QuickSetting
              setting="cellular"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaSignal className="text-3xl" />}
              inactiveIcon={<FaSignal className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="airplane"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaPlane className="text-3xl" />}
              inactiveIcon={<FaPlaneSlash className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="wifi"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaWifi className="text-3xl" />}
              inactiveIcon={<FaWifi className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="hotspot"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaLink className="text-3xl" />}
              inactiveIcon={<FaLinkSlash className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="bluetooth"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaBluetooth className="text-3xl" />}
              inactiveIcon={<FaBluetoothB className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="flashlight"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaLightbulb className="text-3xl" />}
              inactiveIcon={<FaRegLightbulb className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="battery"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaBatteryQuarter className="text-3xl" />}
              inactiveIcon={<FaBatteryFull className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="notification"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaBell className="text-3xl" />}
              inactiveIcon={<FaBellSlash className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="microphone"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaMicrophoneLines className="text-3xl" />}
              inactiveIcon={<FaMicrophoneLinesSlash className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="phone"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaPhone className="text-3xl" />}
              inactiveIcon={<FaPhoneSlash className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="screen"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaUnlock className="text-3xl" />}
              inactiveIcon={<FaLock className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="recording"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaCirclePlay className="text-3xl" />}
              inactiveIcon={<FaRegCirclePlay className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="nfc"
              settings={settings}
              setSettings={setSettings}
              activeIcon={<FaNfcDirectional className="text-3xl" />}
              inactiveIcon={<FaNfcSymbol className="text-3xl" />}
            />
          </div>
          <div className="col-span-1">
            <QuickSetting
              setting="focus"
              settings={settings}
              setSettings={setSettings}
              inactiveIcon={<FaSun className="text-3xl" />}
              activeIcon={<FaMoon className="text-3xl" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
