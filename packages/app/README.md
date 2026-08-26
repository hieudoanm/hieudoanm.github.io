# App

- [App](#app)
  - [Categories](#categories)
  - [Techstack](#techstack)
    - [Hybrid](#hybrid)
    - [Native](#native)
  - [Platform](#platform)

## Categories

| No  | Category               | Examples                                                                                                                                                                                                              |
| --- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Books                  | stories, comics, eReaders, coffee table books, graphic novels                                                                                                                                                         |
| 02  | Business               | document management (PDFs, scanning, file viewing/editing), VoIP telephony, dictation, remote desktop, job search resources, customer resource management, collaboration, enterprise resource planning, point of sale |
| 03  | Developer Tools        | coding, testing, debugging, workflow management, text and code editing                                                                                                                                                |
| 04  | Education              | arithmetic, alphabet, writing, early learning and special education, solar system, vocabulary, colors, language learning, standardized test prep, geography, school portals, pet training, astronomy, crafts          |
| 05  | Entertainment          | television, movies, second screens, fan clubs, theatre, ringtones, voice manipulation, ticketing services, art creation                                                                                               |
| 06  | Finance                | personal financial management, mobile banking, investment, bill reminders, budgets, debt management, tax, small business finance, insurance                                                                           |
| 07  | Food & Drink           | recipe collections, cooking guides, restaurant reviews, celebrity chefs/recipes, dietary & food allergy, alcohol reviews, brewery guides, international cuisine                                                       |
| 08  | Games                  | action, adventure, board, card, family, music, puzzle, racing, role playing, simulation, sports, strategy                                                                                                             |
| 09  | Graphics & Design      | vector graphic design, image editing, drawing and illustration                                                                                                                                                        |
| 10  | Health & Fitness       | yoga, muscle diagrams, workout tracking, running, cycling, stress management, pregnancy, meditation, weight loss, pilates, acupuncture/acupressure, Eastern/Chinese medicine                                          |
| 11  | Lifestyle              | real estate, crafts, hobbies, parenting, fashion, home improvement                                                                                                                                                    |
| 12  | Kids                   | age-appropriate games, interactive stories, educational materials, magazines                                                                                                                                          |
| 13  | Magazines & Newspapers | newspapers, magazines, other recurring periodicals                                                                                                                                                                    |
| 14  | Medical                | skeletal, muscular, anatomy, medical record-keeping, diseases, symptom reference, companion devices (blood pressure, pulse, and so on), health tracking                                                               |
| 15  | Music                  | music creation, radio, education, sound editing, music discovery, composition, lyric writing, band and recording artists, music videos and concerts, concert ticketing                                                |
| 16  | Navigation             | driving assistance, walking assistance, topographical maps, maritime, pilot logs/assistance, oceanic tides, road atlas, fuel finders, public transit maps                                                             |
| 17  | News                   | television, video, radio, or online news outlets or programs, RSS readers                                                                                                                                             |
| 18  | Photo & Video          | capture, editing, special effects, sharing, imaging, printing, greeting card creation, manuals                                                                                                                        |
| 19  | Productivity           | task management, calendar management, translation, note taking, printing, password management, cloud storage, email clients, flow chart generators, audio dictation, simulation, data viewing                         |
| 20  | Reference              | atlas, dictionary, thesaurus, quotations, encyclopedia, general research, animals, law, religion, how-tos, politics                                                                                                   |
| 21  | Safari Extensions      | content bookmarkers, password managers, adblockers, savings finders                                                                                                                                                   |
| 22  | Shopping               | commerce, marketplace, coupon, product review, apps with Apple Pay                                                                                                                                                    |
| 23  | Social Networking      | interpersonal connections, text messaging, voice messaging, video communication, photo & video sharing, dating, blogs, special interest communities, companion apps for traditional social networking services        |
| 24  | Sports                 | fantasy sports companions, college teams/conference, professional teams/leagues, athletes, score trackers, instruction, sports news                                                                                   |
| 25  | Travel                 | flight tracking, multi-time clocks, city guides, hotel/rental car/air fare shopping, vacation planning, public transportation, travel rewards                                                                         |
| 26  | Utilities              | calculators (standard, tip, financial), clocks, measurement, time, web browsing, flashlights, screen locks, barcode scanners, unit conversion tools, password management, remote controls                             |
| 27  | Weather                | radar, forecast, storms, tides, severe weather, local weather                                                                                                                                                         |

Reference: [App Store - Categories](https://developer.apple.com/app-store/categories/)

## Techstack

### Hybrid

| No  | Category            | Name                       | Version | Alternative          |
| --- | ------------------- | -------------------------- | ------- | -------------------- |
| 01  | Language            | [TypeScript]               | 6.+     |                      |
| 02  | Runtime             | [Node.js][node.js]         | 26.+    | [Bun]                |
| 03  | Package Manager     | [pnpm][pnpm]               | 11.+    | [npm]                |
| 04  | Linter              | [ESLint][eslint]           | 9.+     | [Biome]              |
| 05  | Formatter           | [Prettier][prettier]       | 3.+     | [Biome]              |
| 06  | Testing Framework   | [Jest][jest]               | 30.+    |                      |
| 07  | Testing Framework   | [Playwright][playwright]   | 1.+     |                      |
| 08  | Framework           | [React][react]             | 19.+    | [Solid]              |
| 09  | Framework           | [Next.js][next.js]         |         | [SolidStart]         |
| 10  | Styling             | [TailwindCSS][tailwindcss] | 4.+     |                      |
| 11  | Styling             | [DaisyUI][daisyui]         | 5.+     |                      |
| 12  | Desktop Application | [Tauri][tauri]             | 2.+     | [Electron][electron] |

[node.js]: https://nodejs.org/
[pnpm]: https://pnpm.io/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/
[playwright]: https://playwright.dev/
[react]: https://react.dev/
[next.js]: https://nextjs.org/
[tailwindcss]: https://tailwindcss.com/
[daisyui]: https://daisyui.com/
[tauri]: https://tauri.app/
[electron]: https://www.electronjs.org/

### Native

| No  | Language | Styling   | Operating System           |
| --- | -------- | --------- | -------------------------- |
| 01  | [Kotlin] | [Jetpack] | [Android]                  |
| 02  | [Swift]  | [SwiftUI] | [iOS] / [iPadOS] / [macOS] |

[kotlin]: https://kotlinlang.org
[jetpack]: https://developer.android.com/jetpack
[android]: https://developer.android.com
[swift]: https://www.swift.org
[swiftui]: https://developer.apple.com/xcode/swiftui/
[ios]: https://developer.apple.com/ios

## Platform

| No  | Group   | Category | Name      |
| --- | ------- | -------- | --------- |
| 01  | Desktop | [Linux]  | [Arch]    |
| 02  | Desktop | [Linux]  | [Debian]  |
| 03  | Desktop | [Linux]  | [Ubuntu]  |
| 04  | Desktop |          | [macOS]   |
| 05  | Desktop |          | [Windows] |
| 06  | Tablet  |          | [iPadOS]  |
| 07  | Mobile  |          | [iOS]     |
| 08  | Mobile  |          | [Android] |

[Linux]: https://linux.org/
[Ubuntu]: https://ubuntu.com/
[Arch]: https://archlinux.org/
[macOS]: https://www.apple.com/mac/
