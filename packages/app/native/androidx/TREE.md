# TREE

```text
├── android/
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── kotlin/
│   │   │   │   │   └── io/
│   │   │   │   │       └── github/
│   │   │   │   │           └── hieudoanm/
│   │   │   │   │               ├── androidx/
│   │   │   │   │               │   ├── activity/
│   │   │   │   │               │   │   └── [MainActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/androidx/activity/MainActivity.kt)
│   │   │   │   │               │   ├── ui/
│   │   │   │   │               │   │   ├── home/
│   │   │   │   │               │   │   │   └── [HomeScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/androidx/ui/home/HomeScreen.kt)
│   │   │   │   │               │   │   └── theme/
│   │   │   │   │               │   │       ├── [Color.kt](./android/app/src/main/kotlin/io/github/hieudoanm/androidx/ui/theme/Color.kt)
│   │   │   │   │               │   │       └── [Theme.kt](./android/app/src/main/kotlin/io/github/hieudoanm/androidx/ui/theme/Theme.kt)
│   │   │   │   │               │   └── [AndroidXApp.kt](./android/app/src/main/kotlin/io/github/hieudoanm/androidx/AndroidXApp.kt)
│   │   │   │   │               ├── block/
│   │   │   │   │               │   ├── accessibility/
│   │   │   │   │               │   │   └── [FocusAccessibilityService.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/accessibility/FocusAccessibilityService.kt)
│   │   │   │   │               │   ├── activity/
│   │   │   │   │               │   │   ├── [BlockActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/activity/BlockActivity.kt)
│   │   │   │   │               │   │   └── [MainActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/activity/MainActivity.kt)
│   │   │   │   │               │   ├── data/
│   │   │   │   │               │   │   ├── database/
│   │   │   │   │               │   │   │   ├── [AppDao.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/database/AppDao.kt)
│   │   │   │   │               │   │   │   └── [FocusDatabase.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/database/FocusDatabase.kt)
│   │   │   │   │               │   │   ├── entity/
│   │   │   │   │               │   │   │   ├── [BlockedApp.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/entity/BlockedApp.kt)
│   │   │   │   │               │   │   │   └── [Schedule.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/entity/Schedule.kt)
│   │   │   │   │               │   │   └── preferences/
│   │   │   │   │               │   │       └── [SettingsDataStore.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/preferences/SettingsDataStore.kt)
│   │   │   │   │               │   ├── di/
│   │   │   │   │               │   │   └── [AppModule.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/di/AppModule.kt)
│   │   │   │   │               │   ├── navigation/
│   │   │   │   │               │   │   └── [NavGraph.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/navigation/NavGraph.kt)
│   │   │   │   │               │   ├── repository/
│   │   │   │   │               │   │   └── [FocusRepository.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/repository/FocusRepository.kt)
│   │   │   │   │               │   └── ui/
│   │   │   │   │               │       ├── apps/
│   │   │   │   │               │       │   ├── [AppListScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/apps/AppListScreen.kt)
│   │   │   │   │               │       │   └── [AppListViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/apps/AppListViewModel.kt)
│   │   │   │   │               │       ├── block/
│   │   │   │   │               │       │   └── [BlockScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/block/BlockScreen.kt)
│   │   │   │   │               │       ├── home/
│   │   │   │   │               │       │   ├── [HomeScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/home/HomeScreen.kt)
│   │   │   │   │               │       │   └── [HomeViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/home/HomeViewModel.kt)
│   │   │   │   │               │       ├── settings/
│   │   │   │   │               │       │   ├── [SettingsScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/settings/SettingsScreen.kt)
│   │   │   │   │               │       │   └── [SettingsViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/settings/SettingsViewModel.kt)
│   │   │   │   │               │       └── theme/
│   │   │   │   │               │           ├── [Color.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/theme/Color.kt)
│   │   │   │   │               │           └── [Theme.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/theme/Theme.kt)
│   │   │   │   │               └── nfc/
│   │   │   │   │                   ├── activity/
│   │   │   │   │                   │   └── [MainActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/activity/MainActivity.kt)
│   │   │   │   │                   ├── data/
│   │   │   │   │                   │   ├── database/
│   │   │   │   │                   │   │   ├── [AppDatabase.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/database/AppDatabase.kt)
│   │   │   │   │                   │   │   ├── [TagHistoryDao.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/database/TagHistoryDao.kt)
│   │   │   │   │                   │   │   └── [TagProfileDao.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/database/TagProfileDao.kt)
│   │   │   │   │                   │   ├── entity/
│   │   │   │   │                   │   │   ├── [TagHistory.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/entity/TagHistory.kt)
│   │   │   │   │                   │   │   └── [TagProfile.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/entity/TagProfile.kt)
│   │   │   │   │                   │   ├── nfc/
│   │   │   │   │                   │   │   ├── [HceApduService.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/HceApduService.kt)
│   │   │   │   │                   │   │   ├── [NdefReader.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/NdefReader.kt)
│   │   │   │   │                   │   │   ├── [NdefWriter.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/NdefWriter.kt)
│   │   │   │   │                   │   │   ├── [TagDispatcher.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/TagDispatcher.kt)
│   │   │   │   │                   │   │   └── [TagTechInspector.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/TagTechInspector.kt)
│   │   │   │   │                   │   ├── preferences/
│   │   │   │   │                   │   │   └── [SettingsDataStore.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/preferences/SettingsDataStore.kt)
│   │   │   │   │                   │   └── repository/
│   │   │   │   │                   │       └── [NfcRepository.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/repository/NfcRepository.kt)
│   │   │   │   │                   ├── di/
│   │   │   │   │                   │   └── [AppModule.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/di/AppModule.kt)
│   │   │   │   │                   ├── domain/
│   │   │   │   │                   │   └── model/
│   │   │   │   │                   │       ├── [NdefRecordModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/domain/model/NdefRecordModel.kt)
│   │   │   │   │                   │       └── [TagInfo.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/domain/model/TagInfo.kt)
│   │   │   │   │                   ├── navigation/
│   │   │   │   │                   │   └── [NavGraph.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/navigation/NavGraph.kt)
│   │   │   │   │                   └── ui/
│   │   │   │   │                       ├── history/
│   │   │   │   │                       │   ├── [HistoryScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/history/HistoryScreen.kt)
│   │   │   │   │                       │   └── [HistoryViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/history/HistoryViewModel.kt)
│   │   │   │   │                       ├── home/
│   │   │   │   │                       │   ├── [HomeScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/home/HomeScreen.kt)
│   │   │   │   │                       │   └── [HomeViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/home/HomeViewModel.kt)
│   │   │   │   │                       ├── settings/
│   │   │   │   │                       │   ├── [SettingsScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/settings/SettingsScreen.kt)
│   │   │   │   │                       │   └── [SettingsViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/settings/SettingsViewModel.kt)
│   │   │   │   │                       └── theme/
│   │   │   │   │                           ├── [Color.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/theme/Color.kt)
│   │   │   │   │                           └── [Theme.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/theme/Theme.kt)
│   │   │   │   ├── res/
│   │   │   │   │   ├── drawable/
│   │   │   │   │   │   ├── [ic_launcher_background.xml](./android/app/src/main/res/drawable/ic_launcher_background.xml)
│   │   │   │   │   │   └── [ic_launcher_foreground.xml](./android/app/src/main/res/drawable/ic_launcher_foreground.xml)
│   │   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   │   └── [ic_launcher.xml](./android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   │   ├── values/
│   │   │   │   │   │   ├── [colors.xml](./android/app/src/main/res/values/colors.xml)
│   │   │   │   │   │   ├── [strings.xml](./android/app/src/main/res/values/strings.xml)
│   │   │   │   │   │   └── [themes.xml](./android/app/src/main/res/values/themes.xml)
│   │   │   │   │   └── xml/
│   │   │   │   │       ├── [accessibility_service_config.xml](./android/app/src/main/res/xml/accessibility_service_config.xml)
│   │   │   │   │       └── [apduservice.xml](./android/app/src/main/res/xml/apduservice.xml)
│   │   │   │   └── [AndroidManifest.xml](./android/app/src/main/AndroidManifest.xml)
│   │   │   └── test/
│   │   │       ├── kotlin/
│   │   │       │   └── io/
│   │   │       │       └── github/
│   │   │       │           └── hieudoanm/
│   │   │       │               ├── androidx/
│   │   │       │               │   ├── activity/
│   │   │       │               │   │   └── [MainActivityTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/androidx/activity/MainActivityTest.kt)
│   │   │       │               │   └── ui/
│   │   │       │               │       └── home/
│   │   │       │               │           └── [HomeScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/androidx/ui/home/HomeScreenTest.kt)
│   │   │       │               ├── block/
│   │   │       │               │   ├── accessibility/
│   │   │       │               │   │   └── [FocusAccessibilityServiceTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/accessibility/FocusAccessibilityServiceTest.kt)
│   │   │       │               │   ├── activity/
│   │   │       │               │   │   ├── [BlockActivityTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/activity/BlockActivityTest.kt)
│   │   │       │               │   │   └── [MainActivityTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/activity/MainActivityTest.kt)
│   │   │       │               │   ├── data/
│   │   │       │               │   │   ├── database/
│   │   │       │               │   │   │   ├── [AppDaoTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/database/AppDaoTest.kt)
│   │   │       │               │   │   │   └── [FocusDatabaseTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/database/FocusDatabaseTest.kt)
│   │   │       │               │   │   ├── entity/
│   │   │       │               │   │   │   ├── [BlockedAppTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/entity/BlockedAppTest.kt)
│   │   │       │               │   │   │   └── [ScheduleTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/entity/ScheduleTest.kt)
│   │   │       │               │   │   └── preferences/
│   │   │       │               │   │       └── [SettingsDataStoreTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/preferences/SettingsDataStoreTest.kt)
│   │   │       │               │   ├── di/
│   │   │       │               │   │   └── [AppModuleTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/di/AppModuleTest.kt)
│   │   │       │               │   ├── navigation/
│   │   │       │               │   │   └── [NavGraphTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/navigation/NavGraphTest.kt)
│   │   │       │               │   ├── repository/
│   │   │       │               │   │   └── [FocusRepositoryTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/repository/FocusRepositoryTest.kt)
│   │   │       │               │   └── ui/
│   │   │       │               │       ├── apps/
│   │   │       │               │       │   ├── [AppListScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/apps/AppListScreenTest.kt)
│   │   │       │               │       │   └── [AppListViewModelTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/apps/AppListViewModelTest.kt)
│   │   │       │               │       ├── block/
│   │   │       │               │       │   └── [BlockScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/block/BlockScreenTest.kt)
│   │   │       │               │       ├── home/
│   │   │       │               │       │   ├── [HomeScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/home/HomeScreenTest.kt)
│   │   │       │               │       │   └── [HomeViewModelTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/home/HomeViewModelTest.kt)
│   │   │       │               │       ├── settings/
│   │   │       │               │       │   ├── [SettingsScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/settings/SettingsScreenTest.kt)
│   │   │       │               │       │   └── [SettingsViewModelTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/settings/SettingsViewModelTest.kt)
│   │   │       │               │       └── theme/
│   │   │       │               │           ├── [ColorTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/theme/ColorTest.kt)
│   │   │       │               │           └── [ThemeTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/theme/ThemeTest.kt)
│   │   │       │               └── nfc/
│   │   │       │                   └── [NfcModuleSmokeTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/nfc/NfcModuleSmokeTest.kt)
│   │   │       └── resources/
│   │   │           └── [robolectric.properties](./android/app/src/test/resources/robolectric.properties)
│   │   ├── [build.gradle.kts](./android/app/build.gradle.kts)
│   │   ├── [lint.xml](./android/app/lint.xml)
│   │   └── [proguard-rules.pro](./android/app/proguard-rules.pro)
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./android/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./android/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./android/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./android/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./android/docs/ROADMAP.md)
│   ├── gradle/
│   │   └── wrapper/
│   │       ├── [gradle-wrapper.jar](./android/gradle/wrapper/gradle-wrapper.jar)
│   │       └── [gradle-wrapper.properties](./android/gradle/wrapper/gradle-wrapper.properties)
│   ├── [AGENTS.md](./android/AGENTS.md)
│   ├── [README.md](./android/README.md)
│   ├── [build.gradle.kts](./android/build.gradle.kts)
│   ├── [gradle.properties](./android/gradle.properties)
│   ├── [gradlew](./android/gradlew)
│   ├── [gradlew.bat](./android/gradlew.bat)
│   └── [settings.gradle.kts](./android/settings.gradle.kts)
├── apple/
│   └── [README.md](./apple/README.md)
├── public/
│   ├── [demo-en-descriptions.vtt](./public/demo-en-descriptions.vtt)
│   ├── [demo.mp4](./public/demo.mp4)
│   ├── [demo.png](./public/demo.png)
│   ├── [demo.svg](./public/demo.svg)
│   ├── [index.html](./public/index.html)
│   └── [landify.yaml](./public/landify.yaml)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

83 directories, 109 files
