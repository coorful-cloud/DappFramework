import NetworkConfig from '@/config/network'
import UI from "@/utils/ui"

/**
 * 获取当前连接的网络
 * @returns {Promise<null>}
 */
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

/**
 * 消除精度
 * @param balance
 * @param decimals
 * @param fixed
 * @returns {string|*|number}
 */
function friendlyBalance(balance, decimals, fixed){
    balance = balance/(Math.pow(10, decimals))
    return fixed ? friendNum(balance, fixed) : balance
}

/**
 * 给金额带上精度
 * @param balance
 * @param decimals
 * @returns {string}
 */
function systemBalance(balance, decimals){
    balance = balance * (Math.pow(10, decimals))
    balance = (balance-0).toLocaleString()
    balance = balance.toString().replace(/\$|\,/g, '')
    return balance
}

/**
 * 友好显示长数字
 * @param v
 * @param fix
 * @returns {string|*}
 */
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

/**
 * 格式化字符串
 * @param str
 * @param first
 * @param last
 * @param replace
 * @returns {string|*}
 */
function formatString(str, first, last, replace){
    if(!str || str.length < first + last){
        return str;
    }
    replace = replace ? replace : '...'
    return str.substring(0, first) + replace +  str.substring(str.length-last)
}

/**
 * 获取指定范围随机数
 * @param min
 * @param max
 * @returns {number}
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 判断是否0地址
 * @param address
 * @returns {boolean}
 */
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

/**
 * 解析TRC地址
 * @param address
 * @returns {*}
 */
function parseAddress(address){
    const web3 = window.web3
    if(web3.trx){
        address = web3.address.fromHex(address)
    }
    return address
}

/**
 * 数字转BigNumber
 * @param val
 * @returns {*}
 */
function toBigNumber(val){
    const web3 = window.web3
    if(web3.trx){
        val = web3.toBigNumber(val)
    }
    return val
}

/**
 * 时间戳转日期
 * @param timestamp
 * @returns {string}
 */
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

/**
 * 延时
 * @param delay 毫秒数
 */
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * 深度克隆对象
 * @param Obj
 * @returns {{}|*[]|*}
 */
function clone(Obj){
    let buf;
    if(Obj instanceof Array){
        buf = [];
        let i = Obj.length;
        while(i--){
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if(Obj instanceof Object){
        buf = {};
        for(let k in Obj){
            buf[k] = clone(Obj[k]);
        }
        return buf;
    }else{
        return Obj;
    }
}

/**
 * 复制字符串
 * @param str
 */
function copyText(str){
    const input = document.createElement("input")
    input.value = str
    document.body.appendChild(input)
    input.select()
    document.execCommand("Copy")
    document.body.removeChild(input)
    UI.toast(window.t('copy-success'))
}

/**
 * 切换语言
 * @param lang
 */
function switchLanguage(lang){
    const messages = require('@/config/language').default
    if(messages[lang]){
        localStorage.setItem('lang', lang)
        window.location.reload()
    }
}

/**
 * 判断字符串是否时json格式
 * @param str
 * @returns {boolean}
 */
function isJSON(str) {
    try {
        if(typeof str == "object"){
            return true;
        }else if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch(e) {}
    return false;
}

/**
 * 转出链币（BNB，TRX等）
 * @param to
 * @param amount
 */
function transfer(to, amount) {
    const web3 = window.web3
    if(window.web3.trx){
        web3.trx.sendTransaction(to, amount);
    } else if(window.web3.eth) {
        web3.eth.sendTransaction({
            from: window.connectedAddress,
            to,
            value:amount
        }, (err, res)=>{
            if(err)console.log("err: ", err);
            else console.log("res: ", res);
        });
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
    sleep,
    clone,
    copyText,
    switchLanguage,
    isJSON,
    transfer
}
