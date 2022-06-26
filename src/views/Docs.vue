<template>
    <div class="page-con">
        <div class="left-panel">
            <div class="left-tab-item" v-for="(item, idx) in contract" :key="idx">Contract: {{idx}}</div>
        </div>
        <div class="right-panel">
            <div v-for="(item, idx) in contract" :key="idx">
                <div class="main-title">Contract: {{idx}}</div>
                <div v-for="(iitem, iidx) in item" :key="iidx">
                    <div class="sub-title">{{iitem.method}}</div>
                    <div class="brief" v-if="iitem.methodType == 'view'">
                        <pre>const result = await Contract.{{idx}}.{{iitem.methodName}}({{iitem.params}})</pre>
                    </div>
                    <div class="brief" v-else-if="iitem.methodType == 'payable'">
                        <pre>
const sendValue = 1; // 带精度
Contract.{{idx}}.send(sendValue).{{iitem.methodName}}({{iitem.params}}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})
                    </pre>
                    </div>
                    <div class="brief" v-else>
                        <pre>
Contract.{{idx}}.{{iitem.methodName}}({{iitem.params}}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})
                    </pre>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                contract: null
            }
        },
        computed: {
            currentAccount () {
                return this.$store.state.currentAccount
            }
        },
        watch: {
            async currentAccount(newVal, oldVal){
                if(newVal){
                    this.initData()
                }
            }
        },
        mounted(){
            if(this.currentAccount){
                this.initData()
            }
        },
        methods:{
            initData(){
                const _contract = {}
                for(let c in Contract){
                    const abi = this.getABI(c)
                    const _methods = []
                    for(let funcName in Contract[c].methods){
                        if(funcName.indexOf('0x') == 0){
                            continue
                        }
                        if(funcName.indexOf(')') == -1 && funcName.indexOf('(') == -1){
                            continue
                        }
                        const methodName = funcName.split('(')[0]
                        const methodType = abi[methodName].stateMutability
                        if(abi[methodName].type != 'function'){
                            continue
                        }
                        const params = (funcName.split('(')[1]).replace(')', '')
                        _methods.push({
                            method: funcName,
                            methodName,
                            methodType,
                            params: params
                        })
                    }
                    _contract[c] = _methods
                }
                this.contract = _contract
            },
            getABI(name){
                const abiJSON = require('../assets/abi/' + name + '.json')
                const _abiJSON = {}
                for(let i in abiJSON){
                    _abiJSON[abiJSON[i].name] = abiJSON[i]
                }
                return _abiJSON
            }
        }
    }
</script>

<style scoped>
    .page-con{
        display: flex;
        padding: 50px 0;
    }
    .left-panel{
        width: 240px;
        padding: 20px 30px;
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        background-color: #fff;
    }
    .left-tab-item{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
    .right-panel{
        flex: 1;
        margin-left: 240px;
    }
    .main-title{
        background-color: gray;
        color: #fff;
        padding: 10px 20px;
        font-size: 18px;
        font-weight: bold;
    }
    .sub-title{
        background-color: #eee;
        padding: 6px 20px;
        font-size: 16px;
        margin: 5px 0;
    }
    .brief{
        padding: 10px 20px;
        font-size: 14px;
    }
    .brief label{
        background-color: #eeeeee;
        padding: 3px 6px;
        border-radius: 3px;
        margin-right: 10px;
        font-size: 13px;
    }
    .brief span{
        display: block;
        margin-top: 10px;
    }
    @media screen and (max-width:750px){
        .left-panel{
            display: none;
        }
        .right-panel{
            margin-left: 0;
        }
    }
</style>
