import Toybox.Application;
import Toybox.Lang;
import Toybox.WatchUi;

class NothingApp extends Application.AppBase {
  function initialize() {
    AppBase.initialize();
  }

  // onStart() is called on application start up
  function onStart(state as Dictionary?) as Void {
  }

  // onStop() is called when your application is exiting
  function onStop(state as Dictionary?) as Void {
  }

  // Return the initial view of your application here
  function getInitialView() as [Views] or [Views, InputDelegates] {
    var selectedFace = Application.Storage.getValue("selectedFace");

    System.println(selectedFace);

    if (selectedFace == null) {
      selectedFace = "hands"; // Default to face1 if not set
      Application.Storage.setValue("selectedFace", selectedFace);
    }

    if (selectedFace == "maximalism") {
      return [new MaximalismView()];
    }

    if (selectedFace == "minimalism") {
      return [new MinimalismView()];
    }

    if (selectedFace == "timezones") {
      return [new TimeZonesView()];
    }

    return [new HandsView()];
  }
}

function getApp() as NothingApp {
    return Application.getApp() as NothingApp;
}
