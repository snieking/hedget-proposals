# Hedget Proposals

## Development

### Requirements
* Docker
* Node
* [Auth Server](https://bitbucket.org/chromawallet/auth-server/src/master/)

### Running the blockchain

```shell script
cd test
docker-compose up -d --build
./add-rid-to-env.sh
```

### Configuration
Configure the following values in `src/config.js`.
```
eth.hgetContractAddress
eth.stakerContractAddress
authServer.url
```

### Running the front-end

```shell script
npm start
```

### Core accounts
Helper node scripts are provided under `scripts` for promoting & demoting users.
