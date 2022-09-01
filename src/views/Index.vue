<template>
    <div class="page-con">
        <div>
            <div class="title">获取USDT余额</div>
            <div class="code">
                <pre>
const address = this.currentAccount
const result = await Contract.USDT.balanceOf(address)
                </pre>
            </div>
            <div class="btn" @click="tryTest">试一下</div>
            <div class="result" v-if="testResult != null">
                result: {{testResult}}
            </div>
        </div>

        <div>
            <div class="title">发送WBNB</div>
            <div class="code">
                <pre>
const to = '0xC53ec510525CF8E7cC38D5657fd58E9De58d2441'
const amount = 1
Contract.WBNB.transfer(to, amount).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
                </pre>
            </div>
            <div class="btn" @click="tryTestSend">试一下</div>
            <div class="result" v-if="testResultSend != null">
                result: <br/>
                {{testResultSend}}
            </div>
        </div>

        <div>
            <div class="title">发送BNB</div>
            <div class="code">
                <pre>
const to = '0xC53ec510525CF8E7cC38D5657fd58E9De58d2441'
const amount = CommonFunction.systemBalance(0.01, 18)
CommonFunction.transfer(to, amount)
                </pre>
            </div>
            <div class="btn" @click="tryTestSendBNB">试一下</div>
        </div>

        <div>
            <div class="title">链式调用发送BNB</div>
            <div class="code">
                <pre>
const amount = CommonFunction.systemBalance(0.001, 18)
Contract.WBNB.send(amount).deposit().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
                </pre>
            </div>
            <div class="btn" @click="tryTestDeposit">试一下</div>
            <div class="result" v-if="testResultSend != null">
                result: <br/>
                {{testResultSend}}
            </div>
        </div>

    </div>
</template>

<script>
import UI from "@/utils/ui";
import CommonFunction from "@/utils/commonFunction";
export default {
    data() {
        return {
            currentAccount: window.connectedAddress,
            testResult: null,
            testResultSend: null
        }
    },
    mounted(){
        this.initData()
    },
    methods: {
        async initData(){
            // TODO
        },
        async tryTest(){
            const address = this.currentAccount
            const result = await Contract.USDT.balanceOf(address)
            this.testResult = result
        },
        async tryTestSend(){
            UI.loading('Send..')
            const to = '0xC53ec510525CF8E7cC38D5657fd58E9De58d2441'
            const amount = 1
            Contract.WBNB.transfer(to, amount).then(res => {
                UI.closeLoading()
                this.testResultSend = res
                console.log(res)
            }).catch(err => {
                UI.closeLoading()
                console.log(err)
            })
        },
        async tryTestSendBNB(){
            const to = '0xC53ec510525CF8E7cC38D5657fd58E9De58d2441'
            const amount = CommonFunction.systemBalance(0.01, 18)
            CommonFunction.transfer(to, amount)
        },
        async tryTestDeposit(){
            const amount = CommonFunction.systemBalance(0.001, 18)
            Contract.WBNB.send(amount).deposit().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.page-con{
    padding: 65px 10px;
}
.title{
    font-size: 13px;
    margin-bottom: 5px;
    margin-top: 10px;
}
.code{
    font-size: 12px;
    font-weight: bold;
    background-color: #eee;
    border-radius: 5px;
    overflow-x: scroll;

    pre{
        margin: 10px 10px 0 10px;
        width: auto;
    }
}
.btn{
    line-height: 26px;
    background-color: #131629;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    color: #fff;
}
.result{
    background-color: #eee;
    padding: 10px 6px;
    border-radius: 5px;
    font-size: 13px;
    margin-top: 10px;
}
</style>
