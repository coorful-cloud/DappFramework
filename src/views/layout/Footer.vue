<template>
    <div class="footer-con">
        <div class="tab-item" :class="{on: this.active == idx}" v-for="(item, idx) in tabs" :key="idx" @click="onChange(idx)">
            <img :src="this.active == idx ? item.active : item.inactive" />
            <span>{{item.name}}</span>
        </div>
    </div>
</template>

<script>
import UI from '@/utils/ui'
import CommonFunction from "@/utils/commonFunction";
export default {
    name: 'AppFooter',
    data(){
        return {
            CommonFunction,
            active: null,
            tabs: [{
                    name: 'DEMO',
                    to: '/home',
                    active: require('../../assets/images/tabs/tab-01-active.png'),
                    inactive: require('../../assets/images/tabs/tab-01.png'),
                },{
                    name: '文档',
                    to: '/docs',
                    active: require('../../assets/images/tabs/tab-02-active.png'),
                    inactive: require('../../assets/images/tabs/tab-02.png'),
                }
            ]
        }
    },
    mounted(){
        this.changeTab()
    },
    methods: {
        changeTab(){
            for(let i in this.tabs){
                if(this.tabs[i].to == this.$route.path){
                    this.active = parseInt(i)
                    break
                }
            }
        },
        onChange(idx){
            if(this.tabs[idx].to.indexOf('https://') > -1){
                window.location.href = this.tabs[idx].to
                return
            }
            if(this.$route.path != this.tabs[idx].to) {
                this.active = idx
                this.$router.push(this.tabs[idx].to)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.footer-con{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #131629;

    .tab-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            width: 24px;
            height: 20px;
        }
        span{
            font-size: 12px;
            color: #999;
            font-weight: lighter;
            padding-top: 4px;
        }
        &.on{
            span{
                color: #ffd577;
            }
        }
    }
}
</style>
