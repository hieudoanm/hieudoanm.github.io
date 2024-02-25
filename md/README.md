# Techstack

- [Techstack](#techstack)
  - [Big Tech](#big-tech)
    - [Alphabet (Google)](#alphabet-google)
    - [Amazon](#amazon)
    - [Apple](#apple)
    - [Meta (Facebook)](#meta-facebook)
    - [Microsoft](#microsoft)
      - [GitHub](#github)
  - ["Small" Tech](#small-tech)
    - [Apache](#apache)
    - [HashiCorp](#hashicorp)
    - [JetBrains](#jetbrains)
    - [Netlify](#netlify)
    - [Oracle](#oracle)
    - [Vercel](#vercel)
  - [Open Source](#open-source)
    - [Front-end](#front-end)
      - [CSS\[^3\]](#css3)
      - [Components](#components)
      - [Framework](#framework)
    - [DevOps](#devops)

## Big Tech

### [Alphabet][alphabet] (Google)

| Supersector    | Sector          | Technology                          |
| -------------- | --------------- | ----------------------------------- |
| `Development`  | Language        | [Dart](https://dart.dev)            |
| `Development`  | Language        | [Golang][golang]                    |
| `Development`  | Package Manager | [Go Packages](https://pkg.go.dev)   |
| `Front-end`    | Components      | [MUI][mui]                          |
| `Front-end`    | Library         | [Google Chart][google-chart]        |
| `Front-end`    | Framework       | [AngularJS](https://angularjs.org/) |
| `Front-end`    | Framework       | [Angular][angular]                  |
| `Front-end`    | Framework       | [Flutter](https://flutter.dev)      |
| `Back-end`     | Framework       | [gRPC](https://grpc.io)             |
| `Data Science` | ML              | [Tensorflow][tensorflow]            |
| `DevOps`       | IaaS            | [Google Cloud][google-cloud]        |

### [Amazon][amazon]

[AWS][aws][^1] is an IaaS[^6] Provider

| Supersector | Sector     | Technology           |
| ----------- | ---------- | -------------------- |
| `DevOps`    | Serverless | [Lambda][aws-lambda] |

### [Apple][apple]

| Supersector   | Sector   | Technology     |
| ------------- | -------- | -------------- |
| `Development` | Language | [Swift][swift] |

### [Meta][meta] (Facebook)

| Supersector   | Sector        | Technology                   |
| ------------- | ------------- | ---------------------------- |
| `Development` | Test          | [Jest][jest]                 |
| `Development` | Documentation | [Docusaurus][docusaurus]     |
| `Front-end`   | Web           | [React][react]               |
| `Front-end`   | Mobile        | [React Native][react-native] |
| `Back-end`    | Framework     | [GraphQL][graphql]           |

### [Microsoft][microsoft]

| Supersector   | Sector          | Subsector  | Technology                           |
| ------------- | --------------- | ---------- | ------------------------------------ |
| `Development` | Language        |            | [C#][csharp]                         |
| `Development` | Language        |            | [TypeScript][typescript]             |
| `Development` | IDE[^8]         |            | [VS Code][vscode]                    |
| `Development` | IDE[^8]         |            | [Visual Studio][vs]                  |
| `Development` | Package Manager |            | [npm][npm]                           |
| `Development` | Test            | E2E[^5]    | [playwright](https://playwright.dev) |
| `Development` | Version Control | [git][git] | [GitHub][github]                     |

#### [GitHub][github]

| Supersector | Sector    | Technology                         |
| ----------- | --------- | ---------------------------------- |
| `DevOps`    | CI/CD[^4] | [github.actions][github-actions]   |
| `DevOps`    | Packages  | [github.packages][github-packages] |

## "Small" Tech

### [Apache][apache]

| Supersector | Sector         | Subsector         | Technology                    |
| ----------- | -------------- | ----------------- | ----------------------------- |
| `Back-end`  | Database       | Wide Column       | [Cassandra][apache-cassandra] |
| `Back-end`  | Database       | Wide Column       | [HBase][apache-hbase]         |
| `Back-end`  | Database       | Document Oriented | [CouchDB][apache-couchdb]     |
| `Back-end`  | Message Broker |                   | [ActiveMQ][apache-activemq]   |
| `Back-end`  | Message Broker |                   | [Kafka][apache-kafka]         |
| `Back-end`  | Server         |                   | [HTTP][apache-httpd]          |

### [HashiCorp][hashicorp]

| Supersector | Sector  | Technology             |
| ----------- | ------- | ---------------------- |
| `DevOps`    | Secrets | [vault][vault]         |
| `DevOps`    | IaC[^7] | [terraform][terraform] |

### [JetBrains][jetbrains]

| Supersector   | Sector   | Technology                      |
| ------------- | -------- | ------------------------------- |
| `Development` | Language | [Kotlin][kotlin]                |
| `Development` | IDE[^8]  | [Intellij IDEA][jetbrains-idea] |

### [Netlify][netlify]

| Supersector | Sector     | Technology                        |
| ----------- | ---------- | --------------------------------- |
| `Front-end` | Framework  | [Gatsby.js](https://gatsbyjs.org) |
| `DevOps`    | Serverless | [Netlify][netlify]                |

### [Oracle][oracle]

| Supersector   | Sector   | Technology   |
| ------------- | -------- | ------------ |
| `Development` | Language | [Java][java] |

### [Vercel][vercel]

| Supersector   | Sector     | Written By      | Technology                    |
| ------------- | ---------- | --------------- | ----------------------------- |
| `Development` | Build      | [rust][rust]    | [Turbo][turbo]                |
| `Front-end`   | Components | [node.js][node] | [NextUI](https://nextui.org/) |
| `Front-end`   | Framework  | [node.js][node] | [Next.js][next]               |
| `DevOps`      | Serverless |                 | [Vercel][vercel]              |

## Open Source

| Supersector    | Sector           | Subsector             | Technology                         |
| -------------- | ---------------- | --------------------- | ---------------------------------- |
| `Development`  | Formatter        | [node.js][node]       | [DPrint][dprint]                   |
| `Development`  | Formatter        | [node.js][node]       | [Prettier][prettier]               |
| `Development`  | Linting          | [node.js][node]       | [ESLint][eslint]                   |
| `Development`  | Linting          | [node.js][node]       | [Biome][biome]                     |
| `Development`  | Package Manager  | [node.js][node]       | [Yarn][yarn]                       |
| `Back-end`     | Database         | Key-Value             | [Redis](https://redis.io)          |
| `Back-end`     | Database         | Key-Value             | [Memcached](https://memcached.org) |
| `Back-end`     | Database         | Document              | [MongoDB](https://www.mongodb.com) |
| `Back-end`     | Database         | Relational - SQL[^12] | [CockroachDB][cockroachdb]         |
| `Back-end`     | Database         | Relational - SQL[^12] | [MySQL](https://www.mysql.com/)    |
| `Back-end`     | Database         | Relational - SQL[^12] | [PostgreSQL][postgresql]           |
| `Back-end`     | Database         | Relational - SQL[^12] | [SQLite](https://www.sqlite.org/)  |
| `Back-end`     | Database         | Graph                 | [neo4j](https://neo4j.com)         |
| `Back-end`     | Database         | Search Engine         | [elasticsearch][elasticsearch]     |
| `Back-end`     | Database         | Multi Model           | [FaunaDB](https://fauna.com)       |
| `Back-end`     | Framework        | [node.js][node]       | [Nest.js][nest]                    |
| `Back-end`     | Framework        | [python][python]      | [Fastapi][fastapi]                 |
| `Back-end`     | ORM[^10]         | [node.js][node]       | [Prisma][prisma]                   |
| `Data Science` | Machine Learning | [python][python]      | [Pytorch][pytorch]                 |
| `Data Science` | Machine Learning | [python][python]      | [Keras][keras]                     |
| `Data Science` | Package Manager  | [python][python]      | [Conda][conda]                     |
| `Data Science` | Notebook         | [python][python]      | [Jupyter][jupyter]                 |
| `Data Science` | Analysis         | [python][python]      | [Pandas][pandas]                   |
| `Data Science` | Visualiser       | [python][python]      | [Matplotlib][matplotlib]           |
| `Data Science` | NLP[^9]          | [python][python]      | [Nltk][nltk]                       |

### Front-end

#### CSS[^3]

| Supersector | Sector  | Technology                            |
| ----------- | ------- | ------------------------------------- |
| `Front-end` | CSS[^3] | [Bootstrap](https://getbootstrap.com) |
| `Front-end` | CSS[^3] | [daisyui][daisyui]                    |
| `Front-end` | CSS[^3] | [Materialize CSS][materializecss]     |
| `Front-end` | CSS[^3] | [Tailwind CSS][tailwindcss]           |

#### Components

| Supersector | Sector | Technology                            |
| ----------- | ------ | ------------------------------------- |
| `Front-end` | Web    | [Ant Design](https://ant.design/)     |
| `Front-end` | Web    | [Charka UI][chakra-ui]                |
| `Front-end` | Web    | [shadcn/ui](https://ui.shadcn.com/)   |
| `Front-end` | Web    | [TailwindUI](https://tailwindui.com/) |
| `Front-end` | Web    | [Theme UI](https://theme-ui.com/)     |
| `Front-end` | Mobile | [Native Wind][nativewind]             |

#### Framework

| Supersector | Sector  | Subsector       | Technology                          |
| ----------- | ------- | --------------- | ----------------------------------- |
| `Front-end` | Web     | [node.js][node] | [Solid.js][solid]                   |
| `Front-end` | Web     | [node.js][node] | [Svelte](https://svelte.dev)        |
| `Front-end` | Web     | [node.js][node] | [Vue.js](https://vuejs.org)         |
| `Front-end` | Web     | [node.js][node] | [Nuxt](https://nuxtjs.org)          |
| `Front-end` | Web     | [node.js][node] | [SvelteKit](https://kit.svelte.dev) |
| `Front-end` | Web     | [node.js][node] | [SolidStart][solid-start]           |
| `Front-end` | Mobile  | [node.js][node] | [Expo][expo]                        |
| `Front-end` | Mobile  | [node.js][node] | [Ionic](https://ionicframework.com) |
| `Front-end` | Mobile  | [node.js][node] | [NativeScript][nativescript]        |
| `Front-end` | Desktop | [node.js][node] | [Electron][electron]                |
| `Front-end` | Desktop | [node.js][node] | [Tauri][tauri]                      |

### DevOps

| Supersector | Sector        | Runtime         | Technology               |
| ----------- | ------------- | --------------- | ------------------------ |
| `DevOps`    | CI/CD[^4]     |                 | [jenkins][jenkins]       |
| `DevOps`    | Container     |                 | [docker][docker]         |
| `DevOps`    | Orchestration |                 | [kubernetes][kubernetes] |
| `DevOps`    | BaaS[^2]      | [node.js][node] | [supabase][supabase]     |
| `DevOps`    | PaaS[^11]     |                 | [render][render]         |

[^1]: Amazon Web Services
[^2]: Back-end as a Service
[^3]: Cascading Style Sheets
[^4]: Continous Integration / Continous Delivery
[^5]: End to end
[^6]: Infrastructure as a Service
[^7]: Infrastructure as Code
[^8]: Integrated Development Environment
[^9]: Natural Language Processing
[^10]: Object Relational Mapping
[^11]: Platform as a Service
[^12]: Structured Query Language

[alphabet]: https://abc.xyz
[amazon]: https://www.amazon.com
[angular]: https://angular.io
[apache]: https://www.apache.org
[apache-activemq]: https://activemq.apache.org
[apache-cassandra]: https://cassandra.apache.org
[apache-couchdb]: https://couchdb.apache.org
[apache-hbase]: https://hbase.apache.org
[apache-httpd]: https://httpd.apache.org
[apache-kafka]: https://kafka.apache.org
[apple]: https://www.apple.com
[aws]: https://aws.amazon.com
[aws-lambda]:https://aws.amazon.com/lambda
[biome]: https://biomejs.dev
[chakra-ui]: https://chakra-ui.com
[cockroachdb]: https://www.cockroachlabs.com
[conda]: https://docs.conda.io
[csharp]: https://dotnet.microsoft.com/en-us/languages/csharp
[daisyui]: https://daisyui.com
[docker]: https://www.docker.com
[docusaurus]: https://docusaurus.io
[dprint]: https://dprint.dev
[elasticsearch]: https://www.elastic.co/elasticsearch
[electron]: https://www.electronjs.org
[eslint]: https://eslint.org
[expo]: https://expo.dev
[fastapi]: https://fastapi.tiangolo.com
[git]: https://git-scm.com
[github]: https://github.com
[github-actions]: https://github.com/features/actions
[github-packages]: https://github.com/features/packages
[golang]: https://go.dev
[google-cloud]: https://cloud.google.com
[google-chart]: https://developers.google.com/chart
[graphql]: https://graphql.org
[hashicorp]: https://www.hashicorp.com
[java]: https://www.java.com
[jenkins]: https://www.jenkins.io
[jetbrains]: https://www.jetbrains.com
[jetbrains-idea]: https://www.jetbrains.com/idea
[jest]: https://jestjs.io
[jupyter]: https://jupyter.org
[keras]: https://keras.io
[kotlin]: https://kotlinlang.org
[kubernetes]: https://kubernetes.io
[materializecss]: https://materializecss.com
[matplotlib]: https://matplotlib.org
[meta]: https://developers.facebook.com
[microsoft]: https://www.microsoft.com
[mui]: https://mui.com
[nativescript]: https://nativescript.org
[nativewind]: https://www.nativewind.dev
[nest]: https://nestjs.com
[netlify]: https://netlify.com
[next]: https://nextjs.org
[nltk]: https://www.nltk.org
[node]: https://nodejs.org
[npm]: https://www.npmjs.com
[oracle]: https://www.oracle.com
[pandas]: https://pandas.pydata.org
[postgresql]: https://www.postgresql.org
[prettier]: https://prettier.io
[prisma]: https://www.prisma.io
[python]: https://www.python.org
[pytorch]: https://pytorch.org
[react]: https://react.dev
[react-native]: https://reactnative.dev
[render]: https://render.com
[rust]: https://www.rust-lang.org
[solid]: https://www.solidjs.com
[solid-start]: https://start.solidjs.com
[supabase]: https://supabase.com
[swift]: https://developer.apple.com/swift
[tailwindcss]: https://tailwindcss.com
[tauri]: https://tauri.app
[tensorflow]: https://www.tensorflow.org
[terraform]: https://www.terraform.io
[turbo]: https://turbo.build
[typescript]: https://www.typescriptlang.org
[vault]: https://www.vaultproject.io
[vercel]: https://vercel.com
[vs]: https://visualstudio.microsoft.com/
[vscode]: https://code.visualstudio.com
[yarn]: https://yarnpkg.com
