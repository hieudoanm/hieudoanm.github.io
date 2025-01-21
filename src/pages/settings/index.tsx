import { NextPage } from 'next';
import { useState } from 'react';
import {
  FaBluetooth,
  FaBluetoothB,
  FaLightbulb,
  FaLink,
  FaLinkSlash,
  FaPlane,
  FaPlaneSlash,
  FaRegLightbulb,
  FaSignal,
  FaWifi,
} from 'react-icons/fa6';

const SettingsPage: NextPage = () => {
  const [
    {
      airplane = false,
      hotspot = false,
      wifi = false,
      bluetooth = false,
      cellular = false,
      flashlight = false,
    },
    setSettings,
  ] = useState<{
    airplane: boolean;
    hotspot: boolean;
    wifi: boolean;
    bluetooth: boolean;
    cellular: boolean;
    flashlight: boolean;
  }>({
    airplane: false,
    hotspot: false,
    wifi: false,
    bluetooth: false,
    cellular: false,
    flashlight: false,
  });
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-6">
          <div className="col-span-1">
            <button
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  airplane: !previous.airplane,
                }))
              }>
              <div
                className={`flex aspect-square w-16 items-center justify-center rounded-full ${airplane ? 'bg-red-700' : 'bg-black'} text-white`}>
                {airplane ? (
                  <FaPlane className="text-3xl" />
                ) : (
                  <FaPlaneSlash className="text-3xl" />
                )}
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  cellular: !previous.cellular,
                }))
              }>
              <div
                className={`flex aspect-square w-16 items-center justify-center rounded-full ${cellular ? 'bg-red-700' : 'bg-black'} text-white`}>
                <FaSignal className="text-3xl" />
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  wifi: !previous.wifi,
                }))
              }>
              <div
                className={`flex aspect-square w-16 items-center justify-center rounded-full ${wifi ? 'bg-red-700' : 'bg-black'} text-white`}>
                <FaWifi className="text-3xl" />
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  hotspot: !previous.hotspot,
                }))
              }>
              <div
                className={`flex aspect-square w-16 items-center justify-center rounded-full ${hotspot ? 'bg-red-700' : 'bg-black'} text-white`}>
                {hotspot ? (
                  <FaLink className="text-3xl" />
                ) : (
                  <FaLinkSlash className="text-3xl" />
                )}
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  bluetooth: !previous.bluetooth,
                }))
              }>
              <div
                className={`flex aspect-square w-16 items-center justify-center rounded-full ${bluetooth ? 'bg-red-700' : 'bg-black'} text-white`}>
                {bluetooth ? (
                  <FaBluetooth className="text-3xl" />
                ) : (
                  <FaBluetoothB className="text-3xl" />
                )}
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  flashlight: !previous.flashlight,
                }))
              }>
              <div
                className={`flex aspect-square w-16 items-center justify-center rounded-full ${flashlight ? 'bg-red-700' : 'bg-black'} text-white`}>
                {flashlight ? (
                  <FaLightbulb className="text-3xl" />
                ) : (
                  <FaRegLightbulb className="text-3xl" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
