<template>
    <div class="footer-con">
        <div class="tab-item" v-for="(item, idx) in tabs" :key="idx" @click="onChange(idx)">
            <img :src="this.active == idx ? item.active : item.inactive" />
        </div>
    </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import UI from '@/utils/ui'
import CommonFunction from "@/utils/commonFunction";
export default {
    name: 'AppFooter',
    data(){
        return {
            CommonFunction,
            active: null,
            tabs: [
                /*{
                    name: 'home',
                    to: 'https://www.metasango.com',
                    active: require('../../assets/images/tabs/tab-01-active-en.png'),
                    inactive: require('../../assets/images/tabs/tab-01-en.png'),
                },{
                    name: 'farm',
                    to: 'https://www.metasango.com/#/farm',
                    active: require('../../assets/images/tabs/tab-02-active-en.png'),
                    inactive: require('../../assets/images/tabs/tab-02-en.png'),
                },{
                    name: 'home',
                    to: '/home',
                    active: require('../../assets/images/tabs/tab-03-active-en.png'),
                    inactive: require('../../assets/images/tabs/tab-03-en.png'),
                },{
                    name: 'land-map',
                    to: '/land-map',
                    active: require('../../assets/images/tabs/tab-04-active-en.png'),
                    inactive: require('../../assets/images/tabs/tab-04-en.png'),
                },{
                    name: 'down',
                    to: 'https://www.metasango.com/#/down',
                    active: require('../../assets/images/tabs/tab-05-active-en.png'),
                    inactive: require('../../assets/images/tabs/tab-05-en.png'),
                }*/
            ]
        }
    },
    mounted(){
        this.changeTab()
    },
    methods: {
        changeTab(){
            for(let i in this.tabs){
                if(this.tabs[i].name == this.$route.name){
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
            if(this.tabs[idx].name == 'market'){
                UI.toast('coming soon')
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
    bottom: -1px;
    left: -1px;
    right: -1px;
    height: 50px;
}
</style>
