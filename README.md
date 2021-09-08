# High Mobility GraphQL sample app

This repo includes a Node.js app, which features a vehicle dashboard and demonstrates how to use the High Mobility GraphQL API.

<img src="graph-ql-dashboard.png"/>

# Table of contents

- [Getting started](#getting-started)
  - [Deploy to Heroku](#deploy-to-heroku)
  - [Where to find config information](#where-to-find-config-information)
- [Local setup](#local-setup)
  - [Requirements](#0-requirements)
  - [Run migrations](#1-run-migrations)
  - [Start API](#2-start-api)
  - [Start client](#3-start-client)
  - [Open in browser](#4-go-to)
  - [Creating and running migrations](#creating-and-running-migrations)
- [Contributing](#contributing)
- [License](#license)

## Getting started

### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/highmobility/hm-graphql-auto-api-explorer/tree/main)

### Where to find config information

Step 0: Make sure you have this sample app deployed. Once you load the root URL, you will be presented to configure it.

1. Go to [high-mobility.com](https://high-mobility.com) and create an account or sign in
2. Create a Cloud App under the Develop tab. For exact details, have a look at the [Create App step](https://docs.high-mobility.com/guides/getting-started/graph-ql/#create-app) in our docs.
3. Choose the Client Certificate tab and then the GraphQL tab as shown in the screenshot below.

<img src="get-graphql-snippet.png" alt="" width="400"/>

5. Second, you need to insert the OAuth2 configuration, which you will find under *My Settings/Team Settings > OAuth Client*. Note that for Cloud Apps created under the Production tab, the OAuth2 configuration is listed directly in the app details view.
6. In the same OAuth2 page, add the Redirect URI that is listed at the end of the configuration form of this app. This way you are redirected back to the app once the consent flow has finished.

## Local setup

#### 0. Requirements

- Node 16
- Postgres database

#### 1. Run migrations

- `cp .env.example .env`
- Add database credentials to .env
- `npm run migrate:up`

#### 2. Start API

- `npm i`
- `npm start`

#### 3. Start client (in new window)

- `cd client`
- `npm i`
- `npm start`

#### 4. Go to http://localhost:3000

#### Creating and running migrations

`npm run migrate:make my_first_migration`

`npm run migrate:up`

[Full documentation](https://knexjs.org/)

## Contributing

We would love to accept your patches and contributions to this project. Before getting to work, please first discuss the changes that you wish to make with us via [GitHub Issues](https://github.com/highmobility/hm-graphql-auto-api-explorer/issues) or [Slack](https://slack.high-mobility.com/).

See more in [CONTRIBUTING.md](https://github.com/highmobility/hm-graphql-auto-api-explorer/tree/main/CONTRIBUTING.md)

## License

This repository is using MIT license. See more in [LICENSE](https://github.com/highmobility/hm-graphql-auto-api-explorer/tree/main/LICENSE)
