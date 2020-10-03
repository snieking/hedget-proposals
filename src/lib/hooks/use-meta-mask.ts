import React from 'react';
// @ts-ignore
import detectProvider from '@metamask/detect-provider';
import Web3 from 'web3';

import MessageSigner from '../message-signer';
import Staker from '../staker';
import HGET from '../hget';

interface LoginAPI {
  contracts: { staker: Staker; hget: HGET };
  messageSigner: MessageSigner;
  stakeState: null | { amount: number; until: number; isFresh: boolean };
}

interface MetamaskInfo {
  loginAPI?: LoginAPI;
  haveAccounts: boolean;
  selectedAddress: any;
  provider: any;
  updateStakeState: any;
}

export default function useMetaMask(): MetamaskInfo {
  const [loginAPI, setLoginAPI] = React.useState(null);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [haveAccounts, setHaveAccounts] = React.useState(false);

  React.useEffect(() => {
    const initMetaMask = async () => {
      const _provider = await detectProvider();

      if (_provider) {
        _provider.enable();
        setProvider(_provider);
        setHaveAccounts((await _provider.request({ method: 'eth_accounts' })).length > 0);
        const _selectedAddress = _provider.selectedAddress;
        setSelectedAddress(_selectedAddress);
        const web3 = new Web3(_provider);

        try {
          const staker = new Staker(web3);
          const hget = new HGET(web3);

          setLoginAPI({
            contracts: { staker, hget },
            messageSigner: new MessageSigner((window as any).web3.personal), // TODO: use personal from library
            stakeState: await staker.getStakeState(_selectedAddress),
          });
        } catch (error) {
          console.log(error);
        }
      }

      _provider.on('accountsChanged', () => {
        window.location.reload();
      });
    };
    initMetaMask();
  }, [provider, selectedAddress]);

  const updateStakeState = async () =>
    loginAPI &&
    setLoginAPI({
      ...loginAPI,
      stakeState: await loginAPI.contracts.staker.getStakeState(selectedAddress),
    });

  return {
    provider,
    haveAccounts,
    loginAPI,
    selectedAddress,
    updateStakeState
  };
}
