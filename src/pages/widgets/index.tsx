import {
  WidgetBrowser,
  WidgetCalculator,
  WidgetCalendarMonthly,
  WidgetCalendarToday,
  WidgetClockAnalog,
  WidgetClockDigital,
  WidgetClockTimeZone,
  WidgetCompass,
  WidgetFiles,
  WidgetFitness,
  WidgetHealth,
  WidgetHome,
  WidgetMail,
  WidgetMaps,
  WidgetMessages,
  WidgetMusic,
  WidgetNews,
  WidgetNotes,
  WidgetPhone,
  WidgetPhotos,
  WidgetStocks,
  WidgetTasks,
  WidgetTranslate,
  WidgetVideos,
  WidgetWallet,
  WidgetWeatherDescription,
  WidgetWeatherTemperature,
} from '@nothing/widgets';
import { NextPage } from 'next';

const WidgetsPage: NextPage = () => {
  const widgets = [
    { id: 'browser', widget: <WidgetBrowser /> },
    { id: 'calculator', widget: <WidgetCalculator /> },
    { id: 'calendar-today', widget: <WidgetCalendarToday /> },
    { id: 'calendar-monthly', widget: <WidgetCalendarMonthly /> },
    { id: 'clock-analog', widget: <WidgetClockAnalog /> },
    { id: 'clock-digital', widget: <WidgetClockDigital /> },
    { id: 'clock-time-zone', widget: <WidgetClockTimeZone /> },
    { id: 'compass', widget: <WidgetCompass /> },
    { id: 'files', widget: <WidgetFiles /> },
    { id: 'fitness', widget: <WidgetFitness /> },
    { id: 'health', widget: <WidgetHealth /> },
    { id: 'home', widget: <WidgetHome /> },
    { id: 'mail', widget: <WidgetMail /> },
    { id: 'maps', widget: <WidgetMaps /> },
    { id: 'messages', widget: <WidgetMessages /> },
    { id: 'music', widget: <WidgetMusic /> },
    { id: 'news', widget: <WidgetNews /> },
    { id: 'notes', widget: <WidgetNotes /> },
    { id: 'phone', widget: <WidgetPhone /> },
    { id: 'photos', widget: <WidgetPhotos /> },
    { id: 'stocks', widget: <WidgetStocks /> },
    { id: 'tasks', widget: <WidgetTasks /> },
    { id: 'translate', widget: <WidgetTranslate /> },
    { id: 'videos', widget: <WidgetVideos /> },
    { id: 'wallet', widget: <WidgetWallet /> },
    { id: 'weather-description', widget: <WidgetWeatherDescription /> },
    { id: 'weather-temperature', widget: <WidgetWeatherTemperature /> },
  ];
  return (
    <div className="h-screen-8 w-screen overflow-hidden bg-gray-100">
      <div className="grid h-full grid-cols-2 md:grid-cols-3">
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
