## Prerequisites

[Node.js](http://nodejs.org/) must be installed.
If you are using [volta](https://volta.sh/), a suitable node version will be used automatically.
Otherwise check the volta section of `package.json` to see which node version this project was last tested with.

## Installation

- Running `npm install` in the module's root directory will install everything you need for development.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the module for publishing to npm.

- `npm run clean` will delete built resources.
