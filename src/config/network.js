
export default {
    bsc: {
        default: false,
        network: "binance",
        networkId: 56,
        chainId: 56,
        chainName: 'BSC',
        chainSymbol: 'BNB',
        decimals: 18,
        logo: '',
        rpcUrl: 'https://bsc-dataseed1.binance.org'
    },
    bscTest: {
        default: true,
        network: "binance",
        networkId: 97,
        chainId: 97,
        chainName: 'BSC-Test',
        chainSymbol: 'BNB',
        decimals: 18,
        logo: '',
        rpcUrl: 'https://data-seed-prebsc-2-s3.binance.org:8545/',
        scanUrl: 'https://testnet.bscscan.com/'
    },
    // 使用TRC网络时请在config/wallet.js配置中去除custom-tl配置项的注释
    trc: {
        default: false,
        network: "mainnet",
        chainName: 'TRC',
        chainSymbol: 'TRX',
        decimals: 6,
        logo: '',
        rpcUrl: ''
    },
    trcTest: {
        default: false,
        network: "shasta",
        chainName: 'TRC',
        chainSymbol: 'TRX',
        decimals: 6,
        logo: '',
        rpcUrl: ''
    }
}

// 以下配置待集成，当前不可用
const supportedChains = [
    {
        name: "Ethereum Mainnet",
        short_name: "eth",
        chain: "ETH",
        network: "mainnet",
        chain_id: 1,
        network_id: 1,
        rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
        native_currency: {
            symbol: "ETH",
            name: "Ethereum",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Ethereum Ropsten",
        short_name: "rop",
        chain: "ETH",
        network: "ropsten",
        chain_id: 3,
        network_id: 3,
        rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
        native_currency: {
            symbol: "ETH",
            name: "Ethereum",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Ethereum Rinkeby",
        short_name: "rin",
        chain: "ETH",
        network: "rinkeby",
        chain_id: 4,
        network_id: 4,
        rpc_url: "https://rinkeby.infura.io/v3/%API_KEY%",
        native_currency: {
            symbol: "ETH",
            name: "Ethereum",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Ethereum Görli",
        short_name: "gor",
        chain: "ETH",
        network: "goerli",
        chain_id: 5,
        network_id: 5,
        rpc_url: "https://goerli.infura.io/v3/%API_KEY%",
        native_currency: {
            symbol: "ETH",
            name: "Ethereum",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "RSK Mainnet",
        short_name: "rsk",
        chain: "RSK",
        network: "mainnet",
        chain_id: 30,
        network_id: 30,
        rpc_url: "https://public-node.rsk.co",
        native_currency: {
            symbol: "RSK",
            name: "RSK",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Ethereum Kovan",
        short_name: "kov",
        chain: "ETH",
        network: "kovan",
        chain_id: 42,
        network_id: 42,
        rpc_url: "https://kovan.infura.io/v3/%API_KEY%",
        native_currency: {
            symbol: "ETH",
            name: "Ethereum",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Ethereum Classic Mainnet",
        short_name: "etc",
        chain: "ETC",
        network: "mainnet",
        chain_id: 61,
        network_id: 1,
        rpc_url: "https://ethereumclassic.network",
        native_currency: {
            symbol: "ETH",
            name: "Ethereum",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "POA Network Sokol",
        short_name: "poa",
        chain: "POA",
        network: "sokol",
        chain_id: 77,
        network_id: 77,
        rpc_url: "https://sokol.poa.network",
        native_currency: {
            symbol: "POA",
            name: "POA",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "POA Network Core",
        short_name: "skl",
        chain: "POA",
        network: "core",
        chain_id: 99,
        network_id: 99,
        rpc_url: "https://core.poa.network",
        native_currency: {
            symbol: "POA",
            name: "POA",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "xDAI Chain",
        short_name: "xdai",
        chain: "POA",
        network: "dai",
        chain_id: 100,
        network_id: 100,
        rpc_url: "https://dai.poa.network",
        native_currency: {
            symbol: "xDAI",
            name: "xDAI",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Callisto Mainnet",
        short_name: "clo",
        chain: "callisto",
        network: "mainnet",
        chain_id: 820,
        network_id: 1,
        rpc_url: "https://clo-geth.0xinfra.com/",
        native_currency: {
            symbol: "CLO",
            name: "CLO",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Binance Smart Chain",
        short_name: "bsc",
        chain: "smartchain",
        network: "mainnet",
        chain_id: 56,
        network_id: 56,
        rpc_url: "https://bsc-dataseed1.defibit.io/",
        native_currency: {
            symbol: "BNB",
            name: "BNB",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Celo Mainnet",
        short_name: "celo",
        chain: "celo",
        network: "mainnet",
        chain_id: 42220,
        network_id: 42220,
        rpc_url: "https://forno.celo.org",
        native_currency: {
            symbol: "CELO",
            name: "CELO",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Celo Alfajores Testnet",
        short_name: "celo",
        chain: "celo",
        network: "alfajores",
        chain_id: 44787,
        network_id: 44787,
        rpc_url: "https://alfajores-forno.celo-testnet.org",
        native_currency: {
            symbol: "CELO",
            name: "CELO",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    },
    {
        name: "Celo Baklava Testnet",
        short_name: "celo",
        chain: "celo",
        network: "baklava",
        chain_id: 62320,
        network_id: 62320,
        rpc_url: "https://baklava-forno.celo-testnet.org",
        native_currency: {
            symbol: "CELO",
            name: "CELO",
            decimals: "18",
            contractAddress: "",
            balance: ""
        }
    }
]
