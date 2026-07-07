# Android Focus Blocker

_A Kotlin + Jetpack Compose application that blocks access to selected apps using Android Accessibility Service._

---

# Goal

Build an Android application that allows the user to:

- Browse installed applications
- Select applications to block
- Enable/disable blocking
- Automatically intercept blocked apps
- Display a custom blocking screen
- Support schedules (future)
- Store settings locally

This project targets modern Android using:

- Kotlin
- Jetpack Compose
- Material 3
- MVVM
- Room
- DataStore
- AccessibilityService

---

# High-Level Architecture

```text
                     User
                      │
                      ▼
             Jetpack Compose UI
                      │
                      ▼
                ViewModel (MVVM)
                      │
                      ▼
                Repository Layer
               ┌────────┴────────┐
               ▼                 ▼
            Room DB          DataStore
               │
               ▼
AccessibilityService (Foreground App Detection)
               │
               ▼
         Is current app blocked?
               │
       ┌───────┴────────┐
       │                │
      No               Yes
       │                │
       ▼                ▼
   Do nothing     Launch BlockActivity
```

---

# Technology Stack

| Layer                | Technology           |
| -------------------- | -------------------- |
| Language             | Kotlin               |
| UI                   | Jetpack Compose      |
| Architecture         | MVVM                 |
| Navigation           | Navigation Compose   |
| Persistence          | Room                 |
| Preferences          | DataStore            |
| Async                | Kotlin Coroutines    |
| Dependency Injection | Hilt (optional)      |
| Blocking             | AccessibilityService |
| Scheduling           | WorkManager (future) |

---

# Project Structure

```
app/
│
├── accessibility/
│   ├── FocusAccessibilityService.kt
│   └── AccessibilityManager.kt
│
├── activity/
│   ├── MainActivity.kt
│   └── BlockActivity.kt
│
├── data/
│   ├── database/
│   │   ├── FocusDatabase.kt
│   │   └── AppDao.kt
│   │
│   ├── entity/
│   │   ├── BlockedApp.kt
│   │   └── Schedule.kt
│   │
│   └── preferences/
│       └── SettingsDataStore.kt
│
├── repository/
│   └── FocusRepository.kt
│
├── ui/
│   ├── home/
│   ├── apps/
│   ├── block/
│   ├── settings/
│   ├── schedule/
│   └── components/
│
├── util/
│
└── worker/
    └── ScheduleWorker.kt
```

---

# Features

## MVP

- Enable Accessibility Service
- List installed applications
- Search installed applications
- Select blocked applications
- Save blocked applications
- Detect foreground application
- Show blocking screen
- Enable/Disable blocker

---

## Version 2

- Daily schedules
- Temporary unlock
- PIN protection
- Usage statistics
- Focus timer
- Notification shortcuts

---

## Version 3

- Categories
- Multiple schedules
- Cloud backup
- Widgets
- WearOS support

---

# Screen Flow

```
Splash
   │
   ▼
Home
   │
   ├──────────────┐
   ▼              ▼
App List      Settings
   │
   ▼
Select Apps
   │
   ▼
Save
```

If blocked:

```
User opens Instagram
        │
        ▼
AccessibilityService
        │
        ▼
Package name detected
        │
        ▼
Blocked?
        │
   Yes ───────────────► BlockActivity
```

---

# Database Schema

## BlockedApp

```
packageName TEXT PRIMARY KEY
label TEXT
icon TEXT (optional)
enabled BOOLEAN
```

---

## Schedule (future)

```
id
packageName
startTime
endTime
daysOfWeek
enabled
```

---

# Accessibility Service

Responsibilities:

- Listen for app changes
- Determine current foreground app
- Ignore system packages
- Check database
- Launch BlockActivity if blocked

Never:

- Perform heavy database queries on the main thread
- Block inside onAccessibilityEvent
- Load icons
- Perform network requests

---

# BlockActivity

Purpose:

Display a full-screen page informing the user that the app is blocked.

Example:

```
🚫

Stay Focused

Instagram is blocked.

Next unlock:
8:00 PM

[Go Home]
```

The activity should:

- hide the action bar
- open instantly
- prevent multiple instances
- close itself after Home is pressed

---

# Home Screen

Sections:

```
Accessibility

✓ Enabled

--------------------

Blocking

✓ Enabled

--------------------

Blocked Apps

23 apps selected

--------------------

Statistics

Today
45 minutes saved
```

---

# App Picker

Display:

```
Search...

────────────────────

☑ Instagram

☑ Reddit

☐ Gmail

☑ TikTok

☑ YouTube
```

Requirements:

- alphabetical sorting
- search
- icons
- package names hidden
- fast scrolling

---

# Settings

```
Enable blocker

Launch on boot

Dark mode

Ignore system apps

Temporary disable

About
```

---

# Repository Responsibilities

The repository should provide:

```
getInstalledApps()

getBlockedApps()

toggleBlockedApp()

isBlocked()

saveSettings()

loadSettings()
```

---

# Room Entities

BlockedApp

```
packageName
label
enabled
```

Future:

```
Schedule

UsageStatistics

FocusSession
```

---

# DataStore

Store:

```
blockingEnabled

firstLaunch

theme

lastBlockedTime

accessibilityEnabled
```

---

# Foreground App Detection

AccessibilityService receives:

```
TYPE_WINDOW_STATE_CHANGED
```

Read:

```
event.packageName
```

Example:

```
com.instagram.android
```

Check:

```
Room

↓

blocked?

↓

Launch BlockActivity
```

---

# Ignore Packages

Ignore at minimum:

```
your.package.name

com.android.systemui

com.google.android.permissioncontroller

launcher package
```

Otherwise the app can enter blocking loops.

---

# Permissions

Accessibility Service only.

No dangerous permissions are required for MVP.

Optional later:

- POST_NOTIFICATIONS
- RECEIVE_BOOT_COMPLETED

---

# Performance

Target:

App detection:

< 30 ms

Database lookup:

< 5 ms

Block screen launch:

< 100 ms

---

# Error Handling

If database unavailable:

Allow app launch.

If Accessibility disabled:

Prompt user.

If package missing:

Ignore.

Never crash AccessibilityService.

---

# Testing

Test:

- Opening blocked apps
- Opening allowed apps
- Rapid app switching
- Screen rotation
- Device reboot
- Accessibility disabled
- Large app lists
- Samsung devices
- Pixel devices

---

# Future Enhancements

## Focus Sessions

```
Start

↓

25 minutes

↓

Everything blocked

↓

Break

↓

Resume
```

---

## Daily Limits

Example:

```
Instagram

60 minutes/day
```

When exceeded:

```
Blocked until tomorrow
```

---

## Categories

```
Social

Games

Streaming

Shopping
```

---

## Statistics

Examples:

```
Today

Blocked attempts:
17

Focus time:
2h 43m

Most opened:
Instagram
```

---

# Development Order

## Phase 1

- Project setup
- Compose
- Navigation
- Material 3

---

## Phase 2

- Installed apps screen
- Search
- Room database

---

## Phase 3

- AccessibilityService
- Foreground detection
- BlockActivity

---

## Phase 4

- Settings
- DataStore
- Enable/Disable blocker

---

## Phase 5

- Polish UI
- Animations
- Testing
- Release

---

# Success Criteria

The application is complete when:

- User enables Accessibility Service.
- User selects apps to block.
- Selected apps are persisted.
- Opening a blocked app immediately displays BlockActivity.
- Allowed apps open normally.
- The blocker can be enabled or disabled from settings.
- The application remains responsive and stable during rapid app switching.
