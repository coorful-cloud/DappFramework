<template>
    <div class="wallet-page-con">
        <div class="connect-wallet-btn" @click="WalletUtil.connect" v-if="!currentAccount">
            connect
        </div>
        <div class="my-wallet" @click="showWallet" v-else>
            {{CommonFunc.formatString(currentAccount, 4, 4)}}
        </div>

        <div class="wallet-dialog" v-if="showDialog">
            <div class="my-address">
                <i v-if="currentAccount">
                    {{currentAccount.substring(0, 6)}} ... {{currentAccount.substring(currentAccount.length-6)}}
                </i>
                <i v-else>...</i>
                <div class="close-btn" @click="showDialog = false">
                    <svg t="1656154938278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2196" width="200" height="200"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" p-id="2197"></path></svg>
                </div>
            </div>
            <div class="balance-value" v-if="chainSymbol">
                <label>{{chainSymbol}} Balance:</label>
                <span>{{balance}}</span>
            </div>
            <div class="balance-value">
                <label>WBNB Balance:</label>
                <span>{{wbnbBalance}}</span>
            </div>
            <div class="balance-value">
                <label>USDT Balance:</label>
                <span>{{usdtBalance}}</span>
            </div>
            <div class="balance-value">
                <label>Task:</label>
                <task-view></task-view>
            </div>
            <div class="disconnect-btn" @click="disconnect">DISCONNECT</div>
        </div>
        <div class="wallet-dialog-mask" v-if="showDialog" @click="showDialog = false"></div>
    </div>
</template>

<script>
    import WalletUtil from '../utils/wallet'
    import CommonFunc from '../utils/commonFunction'
    import eventBus from '@/utils/eventBus'
    import TaskView from '@/components/task'

    export default {
        name: 'Wallet',
        components: {
            TaskView
        },
        data() {
            return {
                WalletUtil,
                CommonFunc,
                isTask: false,
                showDialog: false,
                balance: 0,
                chainSymbol: null,
                refreshing: false,
                wbnbBalance: 0,
                usdtBalance: 0
            }
        },
        computed: {
            currentAccount () {
                return this.$store.state.currentAccount
            }
        },
        created() {
            eventBus.$on('NEW_TASK', () => {
                this.isTask = true
                setTimeout(() => {
                    this.isTask = false
                }, 5000)
            })
        },
        async mounted(){
            WalletUtil.connect()
        },
        methods:{
            async showWallet(){
                this.showDialog = true
                const networkConfig = await CommonFunc.getCurrentNetwork()
                if(!networkConfig){
                    console.log('Error 1001: Invalid network configuration')
                } else {
                    this.balance = CommonFunc.friendlyBalance(await this.getBalance(), networkConfig.decimals, 4)
                    this.chainSymbol = networkConfig.chainSymbol
                }
                // other balance
                this.refreshWallet(networkConfig)
            },
            disconnect(){
                WalletUtil.disconnect()
                this.showDialog = false
            },
            async refreshWallet(networkConfig){
                this.refreshing = true
                // other balance
                this.wbnbBalance = CommonFunc.friendlyBalance(
                    await Contract.WBNB.balanceOf(this.currentAccount),
                    await Contract.WBNB.decimals(),
                    2
                )
                this.usdtBalance = CommonFunc.friendlyBalance(
                    await Contract.USDT.balanceOf(this.currentAccount),
                    await Contract.USDT.decimals(),
                    2
                )
                setTimeout(() => {
                    this.refreshing = false
                }, 500)
            },
            async getBalance(){
                let balance = 0
                if(window.web3.trx){
                    balance = await window.web3.trx.getBalance(this.currentAccount);
                } else {
                    balance = await window.web3.eth.getBalance(this.currentAccount);
                }
                return balance
            }
        }
    }
</script>

<style lang="less" scoped>
    .wallet-page-con{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .connect-wallet-btn{
        width: 100%;
        font-size: 15px;
        color: #fff;
        text-align: center;
        cursor: default;
        box-sizing: border-box;
        line-height: 32px;
        position: relative;
        background-color: rgb(31, 199, 212);
        padding: 0 8px;
        border-radius: 16px;

        &:after{
            content: '';
            position: absolute;
            top: 0;
            left: -5px;
            width: 10px;
            height: 10px;
            background-color: rgb(122, 110, 170);
            border-radius: 50%;
        }
    }
    .my-wallet{
        cursor: default;
        font-size: 14px;
        display: flex;
        align-items: center;
        background-color: rgba(88, 86, 214, 0.5);
        color: #fff;
        height: 28px;
        padding: 0 8px;
        border-radius: 14px;
    }
    .wallet-dialog{
        position: fixed;
        bottom: 50px;
        right: 0;
        left: 0;
        background-size: 100% 100%;
        height: 245px;
        z-index: 9999;
        background-color: #131629;
        border-radius: 10px 10px 0 0;
    }
    .wallet-dialog .title{
        line-height: 50px;
        display: flex;
        position: relative;
    }
    .wallet-dialog .title span{
        display: block;
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #999;
    }
    .wallet-dialog .title .close-btn{
        font-size: 14px;
        cursor: default;
        position: absolute;
        right: 0;
        top: 10px;
        width: 40px;
        height: 40px;
    }
    .sub-title{
        font-size: 15px;
        line-height: 30px;
        text-align: center;
        color: rgb(122, 110, 170);
        margin: 10px 0 0 0;
    }
    .wallet-dialog .balance-value{
        text-align: left;
        font-size: 13px;
        line-height: 20px;
        padding: 0 20px;
        margin: 15px 0 0 0;
        color: rgb(122, 110, 170);
        display: flex;
    }
    .wallet-dialog .balance-value label{
        flex: 1;
    }
    .wallet-dialog .disconnect-btn{
        font-size: 12px;
        line-height: 46px;
        color: rgb(122, 110, 170);
        cursor: default;
        position: absolute;
        bottom: 8px;
        padding-left: 20px;
    }
    .wallet-dialog-mask{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: transparent;
        z-index: 9998;
    }
    .my-address{
        position: relative;
        height: 36px;
        margin: 10px 20px 0 20px;
        line-height: 36px;
        font-size: 13px;
        background-size: 100% 100%;
        color: rgb(122, 110, 170);
        border-bottom: 1px solid rgba(122, 110, 170, .2);

        .close-btn{
            float: right;
            width: 30px;
            height: 30px;
            margin-right: -10px;
            display: flex;
            align-items: center;
            justify-content: center;
            svg{
                width: 24px;
                height: 24px;
                fill: rgb(122, 110, 170);
                flex-shrink: 0;
            }
        }
    }
</style>
