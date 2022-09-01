import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink';

export default {
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: '943ef55ba08a4eea81f50566f11263ec'
            }
        },
        'custom-tp': {
            display: {
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAYAAADFJfKzAAAACXBIWXMAAAsSAAALEgHS3X78AAAD/ElEQVRogd2bz2sTQRTHXzbburWhVI2yh1paKdhDSgsWkf4BWrAHPYvYmzepVxFKwbtQ/4GW0lsPKgp6lVIELUQQ7CGlPeQQaMQKW6x008jEN8tkf85sZrM7/cCSZCbtzjdv9s178yPXbDYhIQwAGMTXAgDoeJsCvlrMbcn7YwA4dJVLRbbYIl5UZBxsFF3Hy5bVOBliicWGAMDsQGAYNQDYR8t3RCdiqcghposmCbFypRPRccUSK451SaSbKlpauHuLiiXiSvhMpgmx7ndRZyYilnjRqZSsGcQOPtNc8IpNs9tGUUPRkfA0nggd95RmBxNbEilY85SoJZTC1c4wsQVFhFKI4BFPKUOQWB2dkWqMYATnS5DYUkadEQ+kN/q23c8bD6Hn7Zgn63+mtiqNWD1kZixfXn7QV/ZU8FHHcThULPlFbsmy6vSSNb+933jkqeBE1+Do6iVtc+mesfJwpod7PEXKmFA4uMWOoWUDWav+Nb/8ss2gepZ3bxqze7vNO56KGNwYya9+XSysCPwlibI+B4k10KqhTH/6Pb99aPNZ64cGsBPkFsQpFnLf3j/tf37zWp43TGyLsNiWcFkrTepWc/Luy6MXAk1oG4pYsaHdN0uCiS/wVPhjsEkLFVtUaaghTm9t64S3JzrfY8UqxeLrY17rOtqUFbt3cMrr5XXalTXXzJ9SkKCFs72O2LRnHWIjEJ21pm+1hGYEs4YjtqBUs+PRMqi88Cb7GLroMztzQffNRLhDSIlcN7WKwH8zhL3w8kR/GTOKNnJvf3Zd7OxEj4hYdbsxSQpE0z5lxd4u6Ruewgg0GQtG3YZYdf3x+U3B29rKiSWzFySn9VREY2ky1z+Thghdum8sCCTvbWhJrnTLZKAvt0uEPps7J+SBkdZclO6elMoaxJqTw/kNwfknNxYVm7plicNxl10ZyFWmhvPlGI7ID8eyNgpOLUY+eDWw4CmUS0ssHWdF52RVwqJOmIqtn2GxVfqGij3OuqOKic0akg0X91VRIECNjSNYsYdn0LpV9oM7EThL1vVsFHPns3QbnZyp1ctkHenU+Th6kv94saF1w/PbbquCj1jAxSA5y5bF5v8LmRvt/YDJf9Ls+MX8foJs/HLJUxNCsdcbBbkxDa0b0RrpOb5Dqd/KOyVyrTaDWDhl5LEq+DgolopikZUdJhQixAIKViEFjBQKEd2YkpXNmUFQoZFGEdmoOZ7B1fnQZ9SN6BbcLG3YrOFjxj2tFGdzNd3ml1b+S4dG3+EljE62zadh5di7yEHCgYikD0NQpByKkHnUxWSOusjAQpE1WdO9SRxioiuDg/hc8w5ZFl401ZQ+eZ/kiS0W8gMEOTQiKvlVCQD4B4xSM0sDvM2FAAAAAElFTkSuQmCC',
                name: 'TokenPocket',
                description: 'Scan with TokenPocket to connect',
            },
            package: WalletConnectProvider,
            options: {
                infuraId: '943ef55ba08a4eea81f5056jsrjyrs3ec'
            }
        },
        // 使用TRC网络时删除以下注释
        /*'custom-tl': {
            display: {
                logo: 'data:image/png;base64,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',
                name: 'TronLink',
                description: 'Scan with TronLink to connect',
            },
            package: WalletLink,
            connector: async () => {
                if(!window.tronWeb){
                    console.log('Please connet to a wallet')
                    return
                }
                const provider = {
                    web3: window.tronWeb,
                    connected: false,
                    type: 'TRON',
                    on: (name, callback) => {
                        if(name == 'accountsChanged'){

                        } else if (name == 'chainChanged') {

                        } else if (name == 'disconnect') {

                        }
                    },
                    onConnect: () => {

                    }
                };
                return provider;
            }
        }*/
    }
}
