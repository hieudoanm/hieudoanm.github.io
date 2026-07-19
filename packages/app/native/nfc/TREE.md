# TREE

```text
├── android/
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── kotlin/
│   │   │       │   └── io/
│   │   │       │       └── github/
│   │   │       │           └── hieudoanm/
│   │   │       │               └── nfc/
│   │   │       │                   ├── activity/
│   │   │       │                   │   └── [MainActivity.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/activity/MainActivity.kt)
│   │   │       │                   ├── data/
│   │   │       │                   │   ├── database/
│   │   │       │                   │   │   ├── [AppDatabase.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/database/AppDatabase.kt)
│   │   │       │                   │   │   ├── [TagHistoryDao.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/database/TagHistoryDao.kt)
│   │   │       │                   │   │   └── [TagProfileDao.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/database/TagProfileDao.kt)
│   │   │       │                   │   ├── entity/
│   │   │       │                   │   │   ├── [TagHistory.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/entity/TagHistory.kt)
│   │   │       │                   │   │   └── [TagProfile.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/entity/TagProfile.kt)
│   │   │       │                   │   ├── nfc/
│   │   │       │                   │   │   ├── [HceApduService.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/HceApduService.kt)
│   │   │       │                   │   │   ├── [NdefReader.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/NdefReader.kt)
│   │   │       │                   │   │   ├── [NdefWriter.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/NdefWriter.kt)
│   │   │       │                   │   │   ├── [TagDispatcher.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/TagDispatcher.kt)
│   │   │       │                   │   │   └── [TagTechInspector.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/nfc/TagTechInspector.kt)
│   │   │       │                   │   ├── preferences/
│   │   │       │                   │   │   └── [SettingsDataStore.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/preferences/SettingsDataStore.kt)
│   │   │       │                   │   └── repository/
│   │   │       │                   │       └── [NfcRepository.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/data/repository/NfcRepository.kt)
│   │   │       │                   ├── di/
│   │   │       │                   │   └── [AppModule.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/di/AppModule.kt)
│   │   │       │                   ├── domain/
│   │   │       │                   │   └── model/
│   │   │       │                   │       ├── [NdefRecordModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/domain/model/NdefRecordModel.kt)
│   │   │       │                   │       └── [TagInfo.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/domain/model/TagInfo.kt)
│   │   │       │                   ├── navigation/
│   │   │       │                   │   └── [NavGraph.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/navigation/NavGraph.kt)
│   │   │       │                   ├── ui/
│   │   │       │                   │   ├── history/
│   │   │       │                   │   │   ├── [HistoryScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/history/HistoryScreen.kt)
│   │   │       │                   │   │   └── [HistoryViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/history/HistoryViewModel.kt)
│   │   │       │                   │   ├── home/
│   │   │       │                   │   │   ├── [HomeScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/home/HomeScreen.kt)
│   │   │       │                   │   │   └── [HomeViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/home/HomeViewModel.kt)
│   │   │       │                   │   ├── settings/
│   │   │       │                   │   │   ├── [SettingsScreen.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/settings/SettingsScreen.kt)
│   │   │       │                   │   │   └── [SettingsViewModel.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/settings/SettingsViewModel.kt)
│   │   │       │                   │   └── theme/
│   │   │       │                   │       ├── [Color.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/theme/Color.kt)
│   │   │       │                   │       └── [Theme.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/ui/theme/Theme.kt)
│   │   │       │                   └── [NfcToolkitApp.kt](./android/app/src/main/kotlin/io/github/hieudoanm/nfc/NfcToolkitApp.kt)
│   │   │       ├── res/
│   │   │       │   ├── drawable/
│   │   │       │   │   ├── [ic_launcher_background.xml](./android/app/src/main/res/drawable/ic_launcher_background.xml)
│   │   │       │   │   └── [ic_launcher_foreground.xml](./android/app/src/main/res/drawable/ic_launcher_foreground.xml)
│   │   │       │   ├── mipmap-anydpi-v26/
│   │   │       │   │   └── [ic_launcher.xml](./android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │       │   ├── values/
│   │   │       │   │   ├── [colors.xml](./android/app/src/main/res/values/colors.xml)
│   │   │       │   │   ├── [strings.xml](./android/app/src/main/res/values/strings.xml)
│   │   │       │   │   └── [themes.xml](./android/app/src/main/res/values/themes.xml)
│   │   │       │   └── xml/
│   │   │       │       └── [apduservice.xml](./android/app/src/main/res/xml/apduservice.xml)
│   │   │       └── [AndroidManifest.xml](./android/app/src/main/AndroidManifest.xml)
│   │   ├── [build.gradle.kts](./android/app/build.gradle.kts)
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
│   ├── ios/
│   │   └── [README.md](./apple/ios/README.md)
│   └── [README.md](./apple/README.md)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

35 directories, 54 files
