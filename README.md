# High Mobility GraphQL sample app

![Auto API](https://github.com/highmobility/auto-api/blob/master/assets/autoapi-header.png?raw=true)
Example app showing how to use the High Mobility GraphQL API

# Table of contents

- [See it on Heroku](#see-it-on-heroku)
- [Getting started](#getting-started)
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

## See it on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/kaareloun/hm-graphql-scaffold)

## Getting started

### Where to find config information

## Local setup

#### 0. Requirements

- Node 16
- Postgres database

#### 1. Run migrations

- `cp .env.example .env`
- Add database credentials to .env
- `npm run migrate up`

#### 2. Start API

- `npm i`
- `npm start`

#### 3. Start client (in new window)

- `cd client`
- `npm i`
- `npm start`

#### 4. Go to http://localhost:3000

## Creating and running migrations

`npm run migrate create my first migration`

`npm run migrate up`

[Full documentation](https://github.com/salsita/node-pg-migrate)

## Contributing

We would love to accept your patches and contributions to this project. Before getting to work, please first discuss the changes that you wish to make with us via [GitHub Issues](https://github.com/highmobility/hm-graphql-auto-api-explorer/issues), [Spectrum](https://spectrum.chat/high-mobility/) or [Slack](https://slack.high-mobility.com/).

See more in [CONTRIBUTING.md](https://github.com/highmobility/hm-graphql-auto-api-explorer/tree/main/CONTRIBUTING.md)

## License

This repository is using MIT license. See more in [LICENSE](https://github.com/highmobility/hm-graphql-auto-api-explorer/tree/main/LICENSE)
