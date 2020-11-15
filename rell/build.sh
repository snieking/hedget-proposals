#!/usr/bin/env sh

# This script produces blockchain configurations which
# include Rell source code

set -eu

rm -rf target

echo "Compiling Hedget Proposals blockchain"
postchain-node/multigen.sh run.xml --source-dir=src --output-dir=target
echo "Successfully compiled Hedget Proposals blockchain"

BRID=$(cat target/blockchains/1/brid.txt)
echo "Creating .env file with brid: ${BRID}"
echo "REACT_APP_BRID=${BRID}" > ../.env
