<template>
    <div>
        <div class="view-task-btn" @click="showTask = true">VIEW<span>({{taskCount}})</span></div>

        <div class="dialog-con" v-if="showTask">
            <div class="task-dialog">
                <div class="con-title">Task
                    <div class="right" @click="showTask = false">
                        <svg t="1656154938278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2196" width="200" height="200"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" p-id="2197"></path></svg>
                    </div>
                </div>
                <div class="task-item" v-for="(item, idx) in task" :key="idx">
                    <div class="title">
                        <label>{{item.title}}</label>
                        <span>{{item.date}}</span>
                    </div>
                    <div class="brief">
                        Hash: {{CommonFunction.formatString(item.hash, 8, 8)}}
                        <div class="right" @click="deleteTask(item)">
                            DELETE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonFunction from "@/utils/commonFunction";
import eventBus from "@/utils/eventBus";
import Task from "@/utils/task";
import UI from "@/utils/ui";
export default {
    data () {
        return {
            CommonFunction,
            taskCount: 0,
            showTask: false,
            task: []
        }
    },
    mounted() {
        this.loadTask()
        if(!window.taskTimer){
            window.taskTimer = setInterval(() => {
                this.loadTask()
            }, 10000)
        }
    },
    methods:{
        loadTask(){
            const web3 = window.web3
            const key = 'TASK_QUEUE_' + window.connectedAddress
            let task = localStorage.getItem(key)
            task = task ? JSON.parse(task) : []
            let _taskCount = 0
            for(let i in task){
                const item = task[i]
                task[i].title = item.title.slice(0,1).toUpperCase() + item.title.slice(1)
                if(!item.status){
                    _taskCount++
                }
                // getTransaction
                if(web3.trx){
                    web3.trx.getTransaction(item.hash).then(res => {
                        if(res.ret && res.ret[0].contractRet == 'SUCCESS'){
                            UI.toast('Transaction successful', 'HASH: ' + CommonFunction.formatString(item.hash, 8, 8), 5000)
                            Task.remove(item.hash)
                            eventBus.$emit('on' + item.action, item.hash)
                        }
                    })
                }
            }
            this.taskCount = _taskCount
            this.task = task
        },
        deleteTask(item){
            Task.remove(item.hash)
            this.loadTask()
        }
    }
}
</script>

<style lang="less" scoped>
.view-task-btn{

    span{
        color: #7645d9;
        margin-left: 2px;
    }
}
.task-dialog{
    width: 80%;
    padding: 15px 0;
    background-color: #fff;
    border-radius: 16px;
    min-height: 300px;

    .con-title{
        font-size: 16px;
        text-align: center;
        padding-bottom: 15px;
        position: relative;
        border-bottom: 1px solid #ddd;

        .right{
            color: #1FC7D4;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            right: 10px;
            top: -5px;
            height: 30px;
            width: 30px;
            position: absolute;

            img{
                height: 12px;
            }
            svg{
                width: 24px;
                height: 24px;
                fill: rgb(40, 13, 95);
                flex-shrink: 0;
            }
        }
    }
    .task-item{
        font-size: 14px;
        border-bottom: 1px solid #ddd;
        padding: 10px 20px;

        .title{
            display: flex;
            align-items: center;
            justify-content: space-between;

            label{
                font-weight: bold;
            }
            span{
                font-weight: lighter;
                font-size: 13px;
            }
        }
        .brief{
            font-weight: lighter;
            font-size: 13px;
            padding-top: 5px;

            .right{
                color: brown;
                float: right;
                font-weight: 400;
            }
        }
    }
}
</style>
