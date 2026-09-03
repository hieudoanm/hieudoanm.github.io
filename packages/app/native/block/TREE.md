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
│   │   │   │   │               └── block/
│   │   │   │   │                   ├── accessibility/
│   │   │   │   │                   │   └── [FocusAccessibilityService.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/accessibility/FocusAccessibilityService.kt)
│   │   │   │   │                   ├── activity/
│   │   │   │   │                   │   ├── [BlockActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/activity/BlockActivity.kt)
│   │   │   │   │                   │   └── [MainActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/activity/MainActivity.kt)
│   │   │   │   │                   ├── data/
│   │   │   │   │                   │   ├── database/
│   │   │   │   │                   │   │   ├── [AppDao.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/database/AppDao.kt)
│   │   │   │   │                   │   │   └── [FocusDatabase.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/database/FocusDatabase.kt)
│   │   │   │   │                   │   ├── entity/
│   │   │   │   │                   │   │   ├── [BlockedApp.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/entity/BlockedApp.kt)
│   │   │   │   │                   │   │   └── [Schedule.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/entity/Schedule.kt)
│   │   │   │   │                   │   └── preferences/
│   │   │   │   │                   │       └── [SettingsDataStore.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/data/preferences/SettingsDataStore.kt)
│   │   │   │   │                   ├── di/
│   │   │   │   │                   │   └── [AppModule.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/di/AppModule.kt)
│   │   │   │   │                   ├── navigation/
│   │   │   │   │                   │   └── [NavGraph.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/navigation/NavGraph.kt)
│   │   │   │   │                   ├── repository/
│   │   │   │   │                   │   └── [FocusRepository.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/repository/FocusRepository.kt)
│   │   │   │   │                   ├── ui/
│   │   │   │   │                   │   ├── apps/
│   │   │   │   │                   │   │   ├── [AppListScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/apps/AppListScreen.kt)
│   │   │   │   │                   │   │   └── [AppListViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/apps/AppListViewModel.kt)
│   │   │   │   │                   │   ├── block/
│   │   │   │   │                   │   │   └── [BlockScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/block/BlockScreen.kt)
│   │   │   │   │                   │   ├── home/
│   │   │   │   │                   │   │   ├── [HomeScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/home/HomeScreen.kt)
│   │   │   │   │                   │   │   └── [HomeViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/home/HomeViewModel.kt)
│   │   │   │   │                   │   ├── settings/
│   │   │   │   │                   │   │   ├── [SettingsScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/settings/SettingsScreen.kt)
│   │   │   │   │                   │   │   └── [SettingsViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/settings/SettingsViewModel.kt)
│   │   │   │   │                   │   └── theme/
│   │   │   │   │                   │       ├── [Color.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/theme/Color.kt)
│   │   │   │   │                   │       └── [Theme.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/ui/theme/Theme.kt)
│   │   │   │   │                   └── [FocusBlockApp.kt](./android/app/src/main/kotlin/io/github/hieudoanm/block/FocusBlockApp.kt)
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
│   │   │   │   │       └── [accessibility_service_config.xml](./android/app/src/main/res/xml/accessibility_service_config.xml)
│   │   │   │   └── [AndroidManifest.xml](./android/app/src/main/AndroidManifest.xml)
│   │   │   └── test/
│   │   │       ├── kotlin/
│   │   │       │   └── io/
│   │   │       │       └── github/
│   │   │       │           └── hieudoanm/
│   │   │       │               └── block/
│   │   │       │                   ├── accessibility/
│   │   │       │                   │   └── [FocusAccessibilityServiceTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/accessibility/FocusAccessibilityServiceTest.kt)
│   │   │       │                   ├── activity/
│   │   │       │                   │   ├── [BlockActivityTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/activity/BlockActivityTest.kt)
│   │   │       │                   │   └── [MainActivityTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/activity/MainActivityTest.kt)
│   │   │       │                   ├── data/
│   │   │       │                   │   ├── database/
│   │   │       │                   │   │   ├── [AppDaoTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/database/AppDaoTest.kt)
│   │   │       │                   │   │   └── [FocusDatabaseTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/database/FocusDatabaseTest.kt)
│   │   │       │                   │   ├── entity/
│   │   │       │                   │   │   ├── [BlockedAppTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/entity/BlockedAppTest.kt)
│   │   │       │                   │   │   └── [ScheduleTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/entity/ScheduleTest.kt)
│   │   │       │                   │   └── preferences/
│   │   │       │                   │       └── [SettingsDataStoreTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/data/preferences/SettingsDataStoreTest.kt)
│   │   │       │                   ├── di/
│   │   │       │                   │   └── [AppModuleTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/di/AppModuleTest.kt)
│   │   │       │                   ├── navigation/
│   │   │       │                   │   └── [NavGraphTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/navigation/NavGraphTest.kt)
│   │   │       │                   ├── repository/
│   │   │       │                   │   └── [FocusRepositoryTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/repository/FocusRepositoryTest.kt)
│   │   │       │                   ├── ui/
│   │   │       │                   │   ├── apps/
│   │   │       │                   │   │   ├── [AppListScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/apps/AppListScreenTest.kt)
│   │   │       │                   │   │   └── [AppListViewModelTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/apps/AppListViewModelTest.kt)
│   │   │       │                   │   ├── block/
│   │   │       │                   │   │   └── [BlockScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/block/BlockScreenTest.kt)
│   │   │       │                   │   ├── home/
│   │   │       │                   │   │   ├── [HomeScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/home/HomeScreenTest.kt)
│   │   │       │                   │   │   └── [HomeViewModelTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/home/HomeViewModelTest.kt)
│   │   │       │                   │   ├── settings/
│   │   │       │                   │   │   ├── [SettingsScreenTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/settings/SettingsScreenTest.kt)
│   │   │       │                   │   │   └── [SettingsViewModelTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/settings/SettingsViewModelTest.kt)
│   │   │       │                   │   └── theme/
│   │   │       │                   │       ├── [ColorTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/theme/ColorTest.kt)
│   │   │       │                   │       └── [ThemeTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/ui/theme/ThemeTest.kt)
│   │   │       │                   └── [FocusBlockAppTest.kt](./android/app/src/test/kotlin/io/github/hieudoanm/block/FocusBlockAppTest.kt)
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
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

55 directories, 71 files
