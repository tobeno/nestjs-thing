# nestjs-thing

![Node.js CI](https://github.com/tobeno/nestjs-thing/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/tobeno/nestjs-thing/branch/master/graph/badge.svg)](https://codecov.io/gh/tobeno/nestjs-thing)

A basic NestJS starter project with some defaults.

For all questions regarding NestJS check out their [docs](https://docs.nestjs.com/).

Remember to replace `nestjs-thing` with a proper project name.
To make you life easy, pick something in kebab-case.
Then it as simple as a global replace in code + a few directory renames.

## Installation

```bash
$ npm install
$ cp .env.example .env
```

## Running the app

```bash
# start in docker
$ npm run docker:up

# stop docker
$ npm run docker:down

# start locally
$ npm run start

# start locally in watch mode
$ npm run start:dev

# start locally in production mode
$ npm run start:prod
```

## Test

```bash
# run unit tests
$ npm run test

# run unit tests in watch mode
$ npm run test:watch

# run e2e tests
$ npm run test:e2e

# run test coverage
$ npm run test:cov
```

## Credits

- [NestJS](https://nestjs.com/) for their amazing framework
- create-multiple-postgresql-databases.sh from https://github.com/mrts/docker-postgresql-multiple-databases
