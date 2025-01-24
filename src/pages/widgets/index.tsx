import {
  WidgetBattery,
  WidgetBrowser,
  WidgetCalculatorBasic,
  WidgetCalculatorConvertForex,
  WidgetCalculatorConvertLength,
  WidgetCalculatorConvertWeight,
  WidgetCalendarEvents,
  WidgetCalendarMonthly,
  WidgetCalendarToday,
  WidgetClockAnalog,
  WidgetClockDigital,
  WidgetClockTimeZone,
  WidgetCompassCompact,
  WidgetCompassFull,
  WidgetCrypto,
  WidgetFiles,
  WidgetFitness,
  WidgetHealthBloodPressure,
  WidgetHealthBodyTemperature,
  WidgetHome,
  WidgetMail,
  WidgetMapsCoordinates,
  WidgetMapsEmbedded,
  WidgetMessages,
  WidgetMusic,
  WidgetNews,
  WidgetNotes,
  WidgetPhoneContacts,
  WidgetPhoneDialer,
  WidgetPhotos,
  WidgetStocksIndexes,
  WidgetStocksSymbols,
  WidgetTasks,
  WidgetTranslate,
  WidgetVideos,
  WidgetWalletBank,
  WidgetWalletForex,
  WidgetWeatherDescription,
  WidgetWeatherTemperature,
} from '@nothing/widgets';
import { NextPage } from 'next';

const WidgetsPage: NextPage = () => {
  const widgets = [
    { id: 'battery', widget: <WidgetBattery /> },
    { id: 'browser', widget: <WidgetBrowser /> },
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
    { id: 'clock-analog', widget: <WidgetClockAnalog /> },
    { id: 'clock-digital', widget: <WidgetClockDigital /> },
    { id: 'clock-time-zone', widget: <WidgetClockTimeZone /> },
    { id: 'compass-compact', widget: <WidgetCompassCompact /> },
    { id: 'compass-full', widget: <WidgetCompassFull /> },
    { id: 'crypto', widget: <WidgetCrypto /> },
    { id: 'files', widget: <WidgetFiles /> },
    { id: 'fitness', widget: <WidgetFitness /> },
    { id: 'health-body-temperature', widget: <WidgetHealthBodyTemperature /> },
    { id: 'health-blood-pressure', widget: <WidgetHealthBloodPressure /> },
    { id: 'home', widget: <WidgetHome /> },
    { id: 'mail', widget: <WidgetMail /> },
    { id: 'maps-coordinates', widget: <WidgetMapsCoordinates /> },
    { id: 'maps-embedded', widget: <WidgetMapsEmbedded /> },
    { id: 'messages', widget: <WidgetMessages /> },
    { id: 'music', widget: <WidgetMusic /> },
    { id: 'news', widget: <WidgetNews /> },
    { id: 'notes', widget: <WidgetNotes /> },
    { id: 'phone-contacts', widget: <WidgetPhoneContacts /> },
    { id: 'phone-dialer', widget: <WidgetPhoneDialer /> },
    { id: 'photos', widget: <WidgetPhotos /> },
    { id: 'stocks-indexes', widget: <WidgetStocksIndexes /> },
    { id: 'stocks-symbols', widget: <WidgetStocksSymbols /> },
    { id: 'tasks', widget: <WidgetTasks /> },
    { id: 'translate', widget: <WidgetTranslate /> },
    { id: 'videos', widget: <WidgetVideos /> },
    { id: 'wallet-bank', widget: <WidgetWalletBank /> },
    { id: 'wallet-forex', widget: <WidgetWalletForex /> },
    { id: 'weather-description', widget: <WidgetWeatherDescription /> },
    { id: 'weather-temperature', widget: <WidgetWeatherTemperature /> },
  ];

  console.log(widgets.length);

  return (
    <div className="h-[1800vh] w-screen overflow-hidden bg-gray-100 md:h-[400vh]">
      <div className="grid h-full grid-cols-1 lg:grid-cols-5">
        {widgets.map(({ id, widget }) => {
          return (
            <div key={id} className="col-span-1">
              <div className="flex h-full w-full items-center justify-center">
                {widget}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WidgetsPage;
