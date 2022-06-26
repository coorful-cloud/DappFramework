import NetworkConfig from '../config/network'

async function getCurrentNetwork(){
    const enable = window.web3 && window.web3.eth && typeof(window.web3.eth.getChainId) == 'function'
    const chainId = enable ? await window.web3.eth.getChainId() : null
    let network = null
    let defaultNetwork = null
    for(let k in NetworkConfig){
        if(NetworkConfig[k].chainId && NetworkConfig[k].chainId == chainId){
            network = NetworkConfig[k]
            break
        }
        if(NetworkConfig[k].default){
            defaultNetwork = NetworkConfig[k]
        }
    }
    return network ? network : defaultNetwork
}

function friendlyBalance(balance, decimals, fixed){
    balance = balance/(Math.pow(10, decimals))
    return fixed ? friendNum(balance, fixed) : balance
}

function systemBalance(balance, decimals){
    balance = balance * (Math.pow(10, decimals))
    balance = (balance-0).toLocaleString()
    balance = balance.toString().replace(/\$|\,/g, '')
    return balance
}

function friendNum(v, fix){
    if(!v){
        return v
    }
    v = parseFloat(v)
    let unitStr = ''
    if(v >= 1000000){
        v = parseFloat(v/1000000).toFixed(2)
        unitStr = 'M'
    } else if (v >= 10000) {
        v = parseInt(parseFloat(v)*100)/100
    } else if (v >= 1000) {
        v = parseInt(parseFloat(v)*1000)/1000
    } else if(v < 0.001){
        v = parseInt(parseFloat(v)*1000000)/1000000
    } else if(v < 0.000001){
        v = 0
    } else {
        v = parseInt(parseFloat(v)*1000000)/1000000
    }

    return (fix ? parseFloat(v).toFixed(fix) : v) + unitStr
}

function formatString(str, first, last, replace){
    if(!str || str.length < first + last){
        return str;
    }
    replace = replace ? replace : '...'
    return str.substring(0, first) + replace +  str.substring(str.length-last)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isZeroAddress(address){
    if(address == '0x0000000000000000000000000000000000000000'){
        return true
    }
    if(address == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'){
        return true
    }
    if(address == '410000000000000000000000000000000000000000'){
        return true
    }
    return false
}

function parseAddress(address){
    const web3 = window.web3
    if(web3.trx){
        address = web3.address.fromHex(address)
    }
    return address
}

function toBigNumber(val){
    const web3 = window.web3
    if(web3.trx){
        val = web3.toBigNumber(val)
    }
    return val
}

function getDate(timestamp){
    const date = timestamp ? new Date(timestamp*1000) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour
    let minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute
    let second = date.getSeconds();
    second = second < 10 ? '0' + second : second
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

function sleep(delay) {
    const start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue
    }
}

export default {
    getCurrentNetwork,
    friendlyBalance,
    systemBalance,
    friendNum,
    formatString,
    getRandom,
    isZeroAddress,
    parseAddress,
    toBigNumber,
    getDate,
    sleep
}
