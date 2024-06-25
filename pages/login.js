import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useLocalStorage } from 'react-use';

export default function LoginPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const router = useRouter();
  const [account, setAccount] = useLocalStorage('account', null);
  const [networkCorrect, setNetworkCorrect] = useState(false);

  useEffect(() => {
    if (account && networkCorrect) {
      router.push('/start');
    }
  }, [account, networkCorrect, router]);

  const connectIOTA = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        await newProvider.send('eth_requestAccounts', []);
        const signer = newProvider.getSigner();
        const userAddress = await signer.getAddress();
        
        // Überprüfen, ob der Benutzer im richtigen Netzwerk ist
        const network = await newProvider.getNetwork();
        if (network.chainId !== 1075) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x433' }], // 1075 in Hex
            });
            setNetworkCorrect(true);
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x433', // 1075 in Hex
                      chainName: 'IOTA EVM Testnet',
                      rpcUrls: ['https://json-rpc.evm.testnet.iotaledger.net'],
                      nativeCurrency: {
                        name: 'IOTA',
                        symbol: 'IOTA',
                        decimals: 18,
                      },
                      blockExplorerUrls: ['https://explorer.evm.testnet.iotaledger.net'],
                    },
                  ],
                });
                setNetworkCorrect(true);
              } catch (addError) {
                console.error('Error adding IOTA network:', addError);
              }
            } else {
              console.error('Error switching network:', switchError);
            }
          }
        } else {
          setNetworkCorrect(true);
        }

        setProvider(newProvider);
        setAccount(userAddress);
        setIsConnected(true);
        if (networkCorrect) {
          router.push('/start');
        }
      } catch (error) {
        console.error('Error connecting to IOTA:', error.message);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Login with IOTA</h1>
      <button onClick={connectIOTA} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Connect to IOTA
      </button>
      {isConnected && !networkCorrect && <p>Please switch to the IOTA EVM Testnet in MetaMask.</p>}
    </div>
  );
}
