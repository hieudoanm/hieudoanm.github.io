# [Nothing](https://hieudoanm.github.io/nothing)

## Table of Content

- [Nothing](#nothing)
  - [Table of Content](#table-of-content)
  - [Downloads](#downloads)
  - [Favourites](#favourites)
  - [Tech Stack](#tech-stack)
    - [Languages](#languages)
    - [Main](#main)
      - [Back-end](#back-end)
    - [Options](#options)
  - [Todo](#todo)

## Downloads

- CLI
  - [x] `nothing.bash` - Download [here](./packages/cli/bash/dist/nothing.bash)
  - [x] `nothing.binary` - Download [here](./packages/cli/go/cobra/bin/nothing)
  - [x] [GitHub CLI - Extensions](https://cli.github.com/manual/gh_extension)
    - [x] `gh-coc` - Download [here](./packages/cli/go/github/extensions/gh-coc/bin/gh-coc)
    - [x] `gh-ignore` - Download [here](./packages/cli/go/github/extensions/gh-ignore/bin/gh-ignore)
    - [x] `gh-license` - Download [here](./packages/cli/go/github/extensions/gh-license/bin/gh-license)
- Desktop
  - [ ] `linux.AppImage`
  - [ ] `linux.deb`
  - [x] `macos.dmg`- Download [here](./packages/frontend/web/src-tauri/dist/dmg/nothing_0.0.1_aarch64.dmg)
  - [x] `windows.exe` - Download [here](./packages/frontend/web/src-tauri/dist/exe/nothing_0.0.1_x64-setup.exe)
- Mobile
  - [ ] `android.apk`

## Favourites

- ⭐ [Apps](https://hieudoanm.github.io/nothing/apps)
  - ⭐ [Chess](https://hieudoanm.github.io/nothing/apps/chess)
    - ⭐ [Chess960](https://hieudoanm.github.io/nothing/apps/chess/books/chess960)
    - ⭐ [Openings](https://hieudoanm.github.io/nothing/apps/chess/books/openings)
  - ⭐ [Instagram](https://hieudoanm.github.io/nothing/apps/instagram)

## Tech Stack

### Languages

- [TypeScript][typescript]: For `front-end` development
  - [Node.js][node.js]
- [Python][python]: For `back-end` development and `machine learning`
  - [Jupyter](https://jupyter.org/)
- [Go][go]: For `back-end` development and `CLI` development

### Main

| No  | Supergroup | Group                | Subgroup       | Technology                                  |
| --- | ---------- | -------------------- | -------------- | ------------------------------------------- |
| 01  | CLI        | Libraries            |                | [Cobra](https://cobra.dev/)                 |
| 02  | CLI        | Libraries            |                | [GitHub CLI][gh-cli]                        |
| 03  | Full-stack | Dev Tools            | Linting        | [ESLint][eslint]                            |
| 04  | Full-stack | Dev Tools            | Formatting     | [Prettier][prettier]                        |
| 05  | Full-stack | Styling              | CSS Utilities  | [TailwindCSS][tailwindcss]                  |
| 06  | Full-stack | Framework            | Web            | [Next.js][next.js] - [React][react]         |
| 07  | Full-stack | Framework            | Mobile         | [Expo][expo] - [React Native][react-native] |
| 08  | Full-stack | Framework            | Desktop        | [Tauri][tauri]                              |
| 09  | Full-stack | Libraries            | Authentication | [NextAuth][next-auth]                       |
| 10  | Full-stack | SaaS                 | Authentication | [Clerk][clerk]                              |
| 11  | DevOps     | Container            |                | [Docker][docker]                            |
| 12  | DevOps     | Container Management |                | [Docker Compose][docker-compose]            |
| 13  | DevOps     | Version Control      |                | [GitHub][gh]                                |
| 14  | DevOps     | CI/CD                |                | [GitHub Actions][gh-actions]                |
| 15  | DevOps     | IaC                  |                | [Terraform][terraform]                      |
| 16  | DevOps     | Hosting              | Static         | [GitHub Pages][gh-pages]                    |
| 17  | DevOps     | Hosting              | Serverless     | [Vercel][vercel]                            |
| 18  | DevOps     | Hosting              | Compute        | [Render][render]                            |

#### Back-end

| No  | Supergroup         | Group            | Subgroup   | Technology                               |
| --- | ------------------ | ---------------- | ---------- | ---------------------------------------- |
| 01  | Golang             | Framework        |            | [net/http](https://pkg.go.dev/net/http)  |
| 02  | [Node.js][node.js] | Framework        |            | [HTTP](https://nodejs.org/api/http.html) |
| 03  | [Node.js][node.js] | Web Scraping     |            | [Puppeteer][puppeteer]                   |
| 04  | [Node.js][node.js] | Database         | ORM        | [Prisma][prisma]                         |
| 05  | Python             | Dev Tools        | Linting    | [Ruff][ruff]                             |
| 06  | Python             | Dev Tools        | Formatting | [Black][black]                           |
| 07  | Python             | Framework        |            | [FastAPI][fastapi]                       |
| 08  | Python             | Machine Learning |            | [scikit-learn][scikit-learn]             |
| 09  | Python             | Machine Learning |            | [TensorFlow][tensorflow]                 |
| 10  |                    | Database         | Key-Value  | [Redis][redis]                           |
| 11  |                    | Database         | NoSQL      | [MongoDB][mongodb]                       |
| 12  |                    | Database         | SQL        | [PostgreSQL][postgresql]                 |

### Options

| No  | Supergroup | Group     | Subgroup       | Technology                                        | Chosen     |
| --- | ---------- | --------- | -------------- | ------------------------------------------------- | ---------- |
| 01  | Front-end  | Libraries | Authentication | [BetterAuth][better-auth]                         |            |
| 02  | Front-end  | Libraries | Authentication | [NextAuth][next-auth]                             | **Chosen** |
| 03  | DevOps     | SaaS      | Authentication | [Auth0][auth0]                                    |            |
| 04  | DevOps     | SaaS      | Authentication | [Clerk][clerk]                                    | **Chosen** |
| 05  | DevOps     | SaaS      | Authentication | [Keycloak][keycloak]                              |            |
| 06  | DevOps     | SaaS      | Authentication | [Okta][okta]                                      |            |
| 07  | DevOps     | SaaS      | Authentication | [OneLogin][onelogin]                              |            |
| 08  | DevOps     | Hosting   | Static         | [GitHub Pages][gh-pages]                          | **Chosen** |
| 09  | DevOps     | Hosting   | Serverless     | [Cloudflare Pages](https://pages.cloudflare.com/) |            |
| 10  | DevOps     | Hosting   | Serverless     | [Netlify](https://www.netlify.com/)               |            |
| 11  | DevOps     | Hosting   | Serverless     | [Vercel](https://vercel.com/)                     | **Chosen** |
| 12  | DevOps     | Hosting   | Compute        | [Render](https://render.com)                      | **Chosen** |

## Todo

- [ ] Build Mobile App with [Expo](https://expo.dev)

[auth0]: https://auth0.com/
[better-auth]: https://www.better-auth.com/
[black]: https://black.readthedocs.io/en/stable/
[clerk]: https://clerk.com/
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[eslint]: https://eslint.org/
[expo]: https://expo.dev/
[fastapi]: https://fastapi.tiangolo.com/
[gh]: https://github.com/
[gh-actions]: https://github.com/features/actions
[gh-cli]: https://docs.github.com/en/github-cli
[gh-pages]: https://pages.github.com/
[go]: https://go.dev/
[keycloak]: https://www.keycloak.org/
[mongodb]: https://www.mongodb.com/
[next-auth]: https://next-auth.js.org/
[next.js]: https://nextjs.org/
[node.js]: https://nodejs.org/en
[onelogin]: https://www.onelogin.com/
[okta]: https://www.okta.com/
[postgresql]: https://www.postgresql.org/
[prettier]: https://prettier.io/
[prisma]: https://www.prisma.io/
[puppeteer]: https://pptr.dev/
[python]: https://www.python.org/
[react]: https://react.dev/
[react-native]: https://reactnative.dev/
[redis]: https://redis.io/
[render]: https://render.com/
[ruff]: https://docs.astral.sh/ruff/
[scikit-learn]: https://scikit-learn.org/
[tailwindcss]: https://tailwindcss.com/
[tensorflow]: https://www.tensorflow.org/
[tauri]: https://v2.tauri.app/
[terraform]: https://www.terraform.io
[typescript]: https://www.typescriptlang.org/
[vercel]: https://vercel.com/
