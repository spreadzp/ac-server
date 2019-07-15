

## Description

Decryptor transactions

## Installation

```bash
$ npm install
$ cp .cmp-env .env

```

fill in .env variables 
in node_modules/@waves/signature-generator/libs/axlsign.js
paste it:
```
  axlsign.convertPk = function (pk) {
      return convertPublicKey(pk);
  }
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
