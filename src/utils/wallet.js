import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConfig from "../config/wallet";
import { getCurrentInstance } from "vue";
import store from '../store'
import Contract from './contract'
import CommonFunc from "@/utils/commonFunction";

async function connect(flag){
    const networkConfig = await CommonFunc.getCurrentNetwork()
    const providerOptions = WalletConfig.providerOptions;
    for(let i in providerOptions){
        if(!providerOptions[i].options){
            continue
        }
        console.log(providerOptions)
        providerOptions[i].options.chainId = networkConfig.chainId
        if(networkConfig.rpcs){
            providerOptions[i].options.rpc = networkConfig.rpcs
        } else {
            const _rpcs = {}
            _rpcs[networkConfig.chainId] = networkConfig.rpcUrl
            providerOptions[i].options.rpc = _rpcs
        }
    }

    let provider, web3Modal
    try {
        web3Modal = new Web3Modal({
            network: networkConfig.network,
            cacheProvider: true,
            disableInjectedProvider: false, // disable metamask
            providerOptions
        })
        if(web3Modal && !flag){
            setTimeout(() => {
                if(!provider){
                    console.log('ClearCachedProvider and reconnect')
                    web3Modal.clearCachedProvider()
                    connect(true)
                }
            }, 3000)
        }
        provider = await web3Modal.connect()
    } catch (err){
        web3Modal.clearCachedProvider()
    }

    if(provider){
        window.provider = provider
        window.web3 = provider.type == 'TRON' ? provider.web3 : new Web3(provider)
        if(window.web3.trx){
            provider.selectedAddress = window.web3.defaultAddress.base58
        } else {
            const chainId = await web3.eth.getChainId()
            if(chainId != networkConfig.chainId){
                await _addChain(provider, networkConfig)
            }
            if(provider.accounts && provider.selectedAddress != provider.accounts[0]){
                provider.selectedAddress = provider.accounts[0]
            }
        }
        window.connectedAddress = provider.selectedAddress
        window.web3Modal = web3Modal

        store.dispatch('setCurrentAccount', window.connectedAddress)
        getCurrentInstance()?.proxy.$eventBus.$emit('WALLET_CONNECTED', window.connectedAddress)

        subscribeProvider(window.provider)

        // Init Contract
        window.connectedAddress && Contract.init()
    }
}

async function _addChain(provider, networkConfig){
    let res = await provider.request({
        method: 'eth_requestAccounts'
    })
    if(!res || res.length == 0){
        return false
    }
    console.log(networkConfig)
    await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: web3.utils.numberToHex(networkConfig.chainId),
                chainName: networkConfig.chainName,
                nativeCurrency: {
                    name: networkConfig.chainSymbol,
                    symbol: networkConfig.chainSymbol,
                    decimals: networkConfig.decimals
                },
                rpcUrls: networkConfig.rpcUrl.split(','),
                blockExplorerUrls: [networkConfig.scanUrl]
            }
        ]
    })
}

async function disconnect() {
    if (window.provider == null) {
        return
    }
    if(typeof(window.provider.disconnect) == 'function'){
        await window.provider.disconnect()
    }
    await window.web3Modal.clearCachedProvider()
    window.provider = null
    window.connectedAddress = null
    window.web3Modal = null

    store.dispatch('setCurrentAccount', window.connectedAddress)
    getCurrentInstance()?.proxy.$eventBus.emit('WALLET_DISCONNECTED')
}

function subscribeProvider(provider){
    if (!provider.on) {
        return
    }
    provider.on("close", () => {
        disconnect()
    })
    provider.on("chainChanged", () => {
        console.log('chainChanged')
    })
    provider.on("networkChanged", () => {
        console.log('networkChanged')
    })
    provider.on("accountsChanged", () => {
        console.log('accountsChanged')
        window.location.reload()
    })
}

export default {
    connect,
    disconnect
}
