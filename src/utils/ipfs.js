import axios from 'axios';
import CommonFunction from "@/utils/commonFunction";
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// run with local daemon
// const ipfs = new IPFS('localhost', '5001', {protocol: 'http'});

ipfs.saveToIPFS = async (file, node) => {
    node = node ? node : 'infura'
    let returnData = null
    if(node == 'pinata'){
        await saveToPinata(file, ipfsHash => {
            if(ipfsHash){
                returnData = {
                    ipfsHash,
                    url: 'https://gateway.pinata.cloud/ipfs/' + ipfsHash
                }
            }
        })
    } else if(node == 'moralis') {
        await saveToMoralis(file, ipfsHash => {
            if(ipfsHash){
                returnData = {
                    ipfsHash,
                    url: 'https://ipfs.moralis.io:2053/ipfs/' + ipfsHash
                }
            }
        })
    } else {
        await saveToInfura(file, ipfsHash => {
            if(ipfsHash){
                returnData = {
                    ipfsHash,
                    url: 'https://ipfs.io/ipfs/' + ipfsHash
                }
            }
        })
    }

    console.log(returnData)
    return returnData
}

const saveToMoralis = async (file, callback) => {
    let url, data
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': '83jCoe8elvC6M3wbGXfy0hWDjJXtj4d0InL13ProiUsNiZ9NAG3288DzKkIcDu7K'
    }
    url = 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder'
    if(file instanceof File) {
        data = [{
            path: 'file',
            content: await _toBase64(file)
        }]
        console.log(data)
    } else if (CommonFunction.isJSON(file)) {
        data = [{
            path: 'metadata',
            content: file
        }]
    }
    await axios({
        method: 'post',
        url,
        headers,
        data
    }).then(function (response) {
        if(response && response.data[0] && response.data[0].path){
            const _arr = response.data[0].path.split('ipfs/')
            callback && callback(_arr[1])
        }
    }).catch(function (error) {
        console.log(error)
        callback && callback(null)
    });
}

const saveToPinata = async (file, callback) => {
    let url, data
    const headers = {
        pinata_api_key: '8d3383aca3abd8220177',
        pinata_secret_api_key: '480950a818e148e850c894c9ae100980bb281e820d037618f29eba22130fb68d'
    }
    if(file instanceof File) {
        url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        data = new FormData();
        data.append('file', file);
        headers['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`
    } else if (CommonFunction.isJSON(file)) {
        url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        data = file
    }

    await axios.post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers
    }).then(function (response) {
        callback && callback(response.data.IpfsHash)
    }).catch(function (error) {
        console.log(error)
        callback && callback(null)
    });
}

const saveToInfura = async (file, callback) => {
    let ipfsHash
    if(file instanceof File) {
        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        // reader.onloadend = function () {}
        const buffer = await _getBuffer(reader)
        console.log(buffer)
        console.log(buffer instanceof Buffer)
        ipfsHash = await addFileToIpfs(buffer)
    } else if (file instanceof Buffer) {
        ipfsHash = await addFileToIpfs(file)
    } else if (CommonFunction.isJSON(file)) {
        ipfsHash = await addFileToIpfs(Buffer(JSON.stringify(file)))
    }
    callback && callback(ipfsHash)
}

const _getBuffer = async (reader) => {
    if(reader.result){
        return _toBuffer(reader.result)
    } else {
        let buffer
        for(let i = 0; i < 100; i++){
            await CommonFunction.sleep(100)
            if(reader.result){
                buffer = _toBuffer(reader.result)
                break
            }
        }
        return buffer
    }
}

const _toBuffer = (ab) => {
    const buf = new Buffer(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const toArrayBuffer = (buf) => {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

const _toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
})

const addFileToIpfs = async (buffer) => {
    const res = await ipfs.files.add(buffer).catch(err => {
        console.log(err)
    })
    console.log(res)
    if(res && res.length > 0){
        return  res[0].hash
    }
    return null
}

export default ipfs;
