---
title: "Web Rendering"
date: "2021-12-12"
author: "Hieu Doan"
description: "Web Rendering"
---

### Single Page Application

A single-page application (SPA) is a website that re-renders its content in response to navigation actions (e.g. clicking a link) without making a request to the server to fetch new HTML.

Pros in the SPA

- Great for web applications
- Faster page loading times
- Improved user experience
- Simplified mobile development: you can reuse the same backend for web application and native mobile application.

Cons in the SPA

- Security: Compare to traditional page Single Page Application is less secure due to Cross-site scripting (XSS).
- Memory Leak: Memory leak in JavaScript can even cause a powerful system to slow down.
- Being empty `<body>` means there will be not content to crawl the data for a search engine. => Low SEO if not implemented correctly.
- SPAs require a heavy framework that's required to be loaded into the browser and are slow to download. As well, since the browser does the heavy lifting, performance can be a problem — especially on less capable mobile devices.

Use cases of SPA:

- Rich site interactions
- An application has very complex UI with many pages/features
- An application has large and dynamic data
- Write preference of the site is more than reading
- The focus is on rich site and a huge number of users

### Sever-side Rendering (SSR) Application

It has been used since the first backend solution, like PHP. Is a method to render your website. When the user opens your page, his browser makes a request to the server, and the server generates ready to provide the app.

Pros in SSR

- Search engines can crawl the site for better SEO.
- No more empty `<body>` tags. There will available contents to crawl the data for a search engine.
- The initial page load is faster.
- Great for static sites.

Cons in SSR

- Frequent server requests => The costs of the servers.
- Full page reloads => An overall slow page rendering.
- SSR need the server or cloud function to render the first page which causes the complexity to deploy.
- Static site deployment is no longer valid needing workaround for cloud function (eg. hosting on firebase will require to use firebase cloud function).

Use cases of SSR

- Non-rich site interactions.
- An application has very simple UI with fewer pages/features
- An application has less dynamic data
- Read preference of the site is more than write
- The focus is not on rich site and has few users
