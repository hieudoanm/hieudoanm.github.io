---
title: 'Workers'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'Workers'
---

### Service Workers

Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available). They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests and take appropriate action based on whether the network is available, and update assets residing on the server. They will also allow access to push notifications and background sync APIs.

To summarize, use service workers to:

- Intercept network requests when the network is unavailable.
- Handle push notifications
- Sync data to and from the server in the background.

The advantage of using a Service Worker for push notifications and background sync is, unlike a Web Worker, it isn't connected to the page lifecycle. So a page refresh won't cause the Service Worker task to be interrupted.

### Web Workers

Web Workers makes it possible to run a script operation in a background thread separate from the main execution thread of a web application. The advantage of this is that laborious processing can be performed in a separate thread, allowing the main (usually the UI) thread to run without being blocked/slowed down.
