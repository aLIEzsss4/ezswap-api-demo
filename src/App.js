import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { ToastContainer } from 'react-toastify';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createWalletClient, custom, createPublicClient, http } from 'viem'
import {
  mainnet, polygon, goerli, zkSyncTestnet, polygonMumbai, arbitrum, arbitrumGoerli, mantaTestnet, manta
} from 'viem/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  createBrowserRouter, RouterProvider, Route, Routes, createHashRouter,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BuyFromPool from './pages/BuyFromPool';
import SellToPool from './pages/SellToPool';
// import Home from './pages/Home';
import MathLib from './pages/MathLib';
import CreatePool from './pages/CreatePool';

const neoevm = {
  id: 2970385,
  name: 'NeoEVM Chain',
  network: 'NeoEVM Chain',
  iconBackground: '#008000',
  nativeCurrency: {
    decimals: 18,
    name: 'GAS',
    symbol: 'GAS',
  },
  rpcUrls: {
    public: { http: ['https://evm.ngd.network:32331'] },
    default: { http: ['https://evm.ngd.network:32331'] },
  },
  blockExplorers: {
    default: { name: 'ngd', url: 'https://evm.ngd.network/' },
    etherscan: { name: 'ngd', url: 'https://evm.ngd.network/' },
  },
  testnet: true,
};

const mantatest2 = {
  id: 3441005,
  name: 'Manta Testnet L2 Rollup',
  network: 'Manta Testnet L2 Rollup',
  iconBackground: '#008000',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://manta-testnet.calderachain.xyz/http'] },
    default: { http: ['https://manta-testnet.calderachain.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'pacific', url: 'https://pacific-explorer.manta.network/' },
    etherscan: { name: 'pacific', url: 'https://pacific-explorer.manta.network/' },
  },
  testnet: true,
};

const mantamain = {
  id: 169,
  name: 'Manta Pacific L2 Rollup',
  network: 'Manta Pacific L2 Rollup',
  iconBackground: '#008000',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://pacific-rpc.manta.network/http'] },
    default: { http: ['https://pacific-rpc.manta.network/http'] },
  },
  blockExplorers: {
    default: { name: 'pacific', url: 'https://pacific-explorer.manta.network/' },
    etherscan: { name: 'pacific', url: 'https://pacific-explorer.manta.network/' },
  },
  testnet: false,
};


export const { chains, publicClient } = configureChains(
  [goerli, polygon, polygonMumbai, arbitrum, manta, arbitrumGoerli, zkSyncTestnet, mantaTestnet],
  [
    alchemyProvider({ apiKey: 'eeb2JnW2JdlOkqPH6NZVhVpRSXKaSW8D' }),
    publicProvider()
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


export const walletClient = createWalletClient({
  chain: chains,
  transport: custom(window.ethereum)
})

const router = createHashRouter([
  {
    path: '/',
    element: <MathLib />,
  },
  {
    path: '/buy',
    element: <BuyFromPool />,
  },
  {
    path: '/sell',
    element: <SellToPool />,
  },
  {
    path: 'mathlib',
    element: <MathLib />,
  },
  {
    path: 'createPool',
    element: <CreatePool />,
  },
]);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
