<template>
    <div class="header-con">
        <div class="logo">
            <svg style="width:100%;height:100%;" version="1.1" id="SITE_LOGO" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 415.075 282.603" enable-background="new 0 0 415.075 282.603" xml:space="preserve" width="100%" height="100%" preserveAspectRatio="none">
                <g>
                    <g>
                        <polygon fill="#5856d6" points="141.551,282.603 0.25,141.302 141.551,0 193.156,51.605 163.569,81.192 141.551,59.175
                            59.425,141.302 141.551,223.428 223.225,141.755 282.17,141.984"></polygon>
                    </g>
                    <g>
                        <polygon fill="#5ac8fa" points="273.774,282.603 222.169,230.999 251.757,201.411 273.774,223.428 355.901,141.302
                            273.774,59.175 196.384,136.565 192.33,140.619 133.155,140.619 273.774,0 415.075,141.302"></polygon>
                    </g>
                </g>
            </svg>
        </div>
        <div class="title">DAPP</div>
        <div class="wallet-btn">
            <wallet></wallet>
        </div>

        <div style="display: none;">
            <task-view></task-view>
        </div>
    </div>
</template>

<script>
    import Wallet from '../../components/wallet'
    import TaskView from '@/components/task'
    export default {
        name: 'AppHeader',
        components: {
            Wallet,
            TaskView
        },
        methods: {
            goTo(to){
                this.$router.push(to)
            },
            goBack(){
                window.history.go(-1)
            }
        }
    }
</script>

<style lang="less" scoped>
.header-con{
    display: flex;
    align-items: center;
    background-color: #131629;
    .logo{
        padding-left: 12px;
        color: #fff;
        font-size: 0;
        text-align: left;
        font-weight: bold;
        width: 100px;

        img{
            width: 34px;
            height: 34px;
        }
        svg{
            width: 46px !important;
            height: 30px !important;
        }
    }
    .title{
        flex: 1;
        color: #fff;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
    }
    .wallet-btn{
        font-size: 12px;
        color: transparent;
        padding-left: 5px;
        padding-right: 12px;
        box-sizing: border-box;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100px;
    }
}
</style>
