import {
  WidgetBattery,
  WidgetBrowser,
  WidgetBrowsers,
  WidgetCalculatorBasic,
  WidgetCalculatorConvertForex,
  WidgetCalculatorConvertLength,
  WidgetCalculatorConvertWeight,
  WidgetCalendarEvents,
  WidgetCalendarMonthly,
  WidgetCalendarToday,
  WidgetClockAnalog,
  WidgetClockDigital,
  WidgetClockPomodoro,
  WidgetClockTimeZone,
  WidgetColorsConverter,
  WidgetColorsPicker,
  WidgetCompassCompact,
  WidgetCompassFull,
  WidgetCrypto,
  WidgetDevices,
  WidgetFiles,
  WidgetFitnessStepCount,
  WidgetGamesFlipism,
  WidgetGamesRockPaperScissors,
  WidgetGamesWheelOfFortune,
  WidgetGoogleTrends,
  WidgetHealthBloodPressure,
  WidgetHealthBodyTemperature,
  WidgetHome,
  WidgetMail,
  WidgetMapsCoordinates,
  WidgetMapsEmbedded,
  WidgetMessages,
  WidgetMusicApps,
  WidgetMusicPlayer,
  WidgetNews,
  WidgetNotes,
  WidgetPhoneContacts,
  WidgetPhoneDialer,
  WidgetPhotos,
  WidgetSports,
  WidgetStocksIndexes,
  WidgetStocksSymbols,
  WidgetTasks,
  WidgetTranslate,
  WidgetTransportation,
  WidgetVideos,
  WidgetWalletBank,
  WidgetWalletForex,
  WidgetWalletPay,
  WidgetWeatherDescription,
  WidgetWeatherTemperature,
} from '~/widgets';
import { WidgetFitnessRun } from '~/widgets/fitness/WidgetFitnessRun';

const WidgetsAllPage = () => {
  const widgets = [
    { id: 'battery', widget: <WidgetBattery /> },
    { id: 'browser', widget: <WidgetBrowser /> },
    { id: 'browsers', widget: <WidgetBrowsers /> },

    { id: 'calculator-basic', widget: <WidgetCalculatorBasic /> },
    {
      id: 'calculator-convert-forex',
      widget: <WidgetCalculatorConvertForex />,
    },
    {
      id: 'calculator-convert-length',
      widget: <WidgetCalculatorConvertLength />,
    },
    {
      id: 'calculator-convert-weight',
      widget: <WidgetCalculatorConvertWeight />,
    },
    { id: 'calendar-today', widget: <WidgetCalendarToday /> },
    { id: 'calendar-monthly', widget: <WidgetCalendarMonthly /> },
    { id: 'calendar-events', widget: <WidgetCalendarEvents /> },
    { id: 'clock-pomodoro', widget: <WidgetClockPomodoro /> },
    { id: 'clock-analog', widget: <WidgetClockAnalog /> },
    { id: 'clock-digital', widget: <WidgetClockDigital /> },
    { id: 'clock-time-zone', widget: <WidgetClockTimeZone /> },
    { id: 'compass-compact', widget: <WidgetCompassCompact /> },
    { id: 'compass-full', widget: <WidgetCompassFull /> },
    { id: 'colors-converter', widget: <WidgetColorsConverter /> },
    { id: 'colors-picker', widget: <WidgetColorsPicker /> },
    { id: 'crypto', widget: <WidgetCrypto /> },
    { id: 'devices', widget: <WidgetDevices /> },
    { id: 'files', widget: <WidgetFiles /> },
    { id: 'fitness-run', widget: <WidgetFitnessRun /> },
    { id: 'fitness-step-count', widget: <WidgetFitnessStepCount /> },
    {
      id: 'games-flipism',
      widget: <WidgetGamesFlipism />,
    },
    {
      id: 'games-rock-paper-scissors',
      widget: <WidgetGamesRockPaperScissors />,
    },
    {
      id: 'games-wheel-of-fortune',
      widget: <WidgetGamesWheelOfFortune />,
    },
    { id: 'google-trends', widget: <WidgetGoogleTrends /> },
    { id: 'health-body-temperature', widget: <WidgetHealthBodyTemperature /> },
    { id: 'health-blood-pressure', widget: <WidgetHealthBloodPressure /> },
    { id: 'home', widget: <WidgetHome /> },
    { id: 'mail', widget: <WidgetMail /> },
    { id: 'maps-coordinates', widget: <WidgetMapsCoordinates /> },
    { id: 'maps-embedded', widget: <WidgetMapsEmbedded /> },
    { id: 'messages', widget: <WidgetMessages /> },
    { id: 'music-apps', widget: <WidgetMusicApps /> },
    { id: 'music-player', widget: <WidgetMusicPlayer /> },
    { id: 'news', widget: <WidgetNews /> },
    { id: 'notes', widget: <WidgetNotes /> },
    { id: 'phone-contacts', widget: <WidgetPhoneContacts /> },
    { id: 'phone-dialer', widget: <WidgetPhoneDialer /> },
    { id: 'photos', widget: <WidgetPhotos /> },
    { id: 'sports', widget: <WidgetSports /> },
    { id: 'stocks-indexes', widget: <WidgetStocksIndexes /> },
    { id: 'stocks-symbols', widget: <WidgetStocksSymbols /> },
    { id: 'tasks', widget: <WidgetTasks /> },
    { id: 'translate', widget: <WidgetTranslate /> },
    { id: 'transportation', widget: <WidgetTransportation /> },
    { id: 'videos', widget: <WidgetVideos /> },
    { id: 'wallet-bank', widget: <WidgetWalletBank /> },
    { id: 'wallet-forex', widget: <WidgetWalletForex /> },
    { id: 'wallet-pay', widget: <WidgetWalletPay /> },
    { id: 'weather-description', widget: <WidgetWeatherDescription /> },
    { id: 'weather-temperature', widget: <WidgetWeatherTemperature /> },
  ];

  console.log(widgets.length);

  return (
    <div class="h-[1300vh] w-screen overflow-hidden bg-gray-100 lg:h-[550vh]">
      <div class="grid h-full grid-cols-2 lg:grid-cols-5">
        {widgets.map(({ id, widget }) => {
          return (
            <div title={id} class="col-span-1">
              <div class="flex h-full w-full items-center justify-center">
                {widget}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WidgetsAllPage;
