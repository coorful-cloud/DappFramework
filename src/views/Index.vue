<template>
    <div class="page-con">

    </div>
</template>

<script>
export default {
    data() {
        return {
            currentAccount: window.connectedAddress,
            tabActive: 1,
            drawingList: []
        }
    },
    mounted(){
        this.initData()
    },
    methods: {
        async initData(){
            // TODO
        }
    }
}
</script>

<style lang="less" scoped>

</style>
