# Boilerplate

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/SHA256SUMS.txt

## About

Boilerplate — Next.js + Tauri foundation with a full atomic design system.

## Features

## App Shell

- App Router with flat routes
- Home page with navigation links
- About page with tech stack info
- Settings page (language, theme, timezone)
- Version page with build timestamp
- 404 and 500 error pages
- Responsive layout (mobile + desktop)
- Bottom navbar for mobile navigation
- Sticky header with back navigation
- Skeleton loading states

## Platform

- Dark theme default (DaisyUI)
- Service worker for offline caching
- PWA manifest for installability
- Tauri desktop app build for macOS

## Design System — Atoms

- Spinner, Badge, Avatar, Separator, TextField, Skeleton
- Button, Checkbox, Icon, Progress, Rating, StatusDot, Switch, Textarea
- CodeBlock, FileInput, Kbd, Radio, Select, Slider, Tag

## Design System — Molecules

- CopyButton, Divider, IconButton, Indicator, NumberField, PasswordField
- Toast, Modal, Card, EmptyState, Tabs, Dropdown

## Design System — Organisms & Templates

- Alert, AvatarGroup, Breadcrumbs, Fieldset, NavItem, Pagination, SearchBar
- Accordion, ChatBubble, FormRow, Steps, TagInput, Timeline, TreeView
- ButtonGroup, Carousel, ConfirmDialog, DangerZone, KeyValue, List, Menu
- Header, Navbar
- DataTable, FeatureGrid, Footer, PricingSection, Sidebar, Toolbar
- ChatWindow, FAQSection, Hero, NewsletterSection, StatsGrid
- BlogSection, ContactSection, CTASection, TeamSection, TestimonialSection
- Calendar, Diff, IntegrationsSection, PageHeader, PricingCard
- Clock, Cube, Dock, EditableText, EmptyPlaceholder, LinkButton, MiniMap
- DatePicker, DateRange, Dialog, FileUpload, ImageGallery, InfoList
- DashboardHeader, DataList, EventTimeline, FaqAccordion, GalleryGrid
- ButtonLink, Collapse, Countdown, Mask, OTPInput, ProgressRing, Stack, Text
- CheckboxGroup, ColorPicker, Combobox, InputGroup, Popover, RadioGroup
- ActivityFeed, AnnouncementBar, AuthForm, CommandMenu, CookieBanner
- AspectRatio, Artboard, BrowserMockup, Label, LetterAvatar, PhoneMockup
- Banner, BottomNavigation, Chip, ContextMenu, Drawer, FloatingActionButton
- Four-level atomic demo with animated level tabs (ComponentsTemplate)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
