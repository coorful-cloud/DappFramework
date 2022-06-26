import eventBus from "@/utils/eventBus";
import CommonFunction from "@/utils/commonFunction";

async function add(title, hash, action, params){
    const key = 'TASK_QUEUE_' + window.connectedAddress
    let task = localStorage.getItem(key)
    task = task ? JSON.parse(task) : []
    task.push({
        title,
        hash,
        action,
        params,
        date: CommonFunction.getDate()
    })
    localStorage.setItem(key, JSON.stringify(task))
    localStorage.setItem('TASK_NUM', task.length)
    await CommonFunction.sleep(500)
    eventBus.$emit('NEW_TASK')
    eventBus.$emit('UPDATE_TASK')
}

async function remove(hash){
    const key = 'TASK_QUEUE_' + window.connectedAddress
    let task = localStorage.getItem(key)
    task = task ? JSON.parse(task) : []
    let id
    for(let i in task){
        if(task[i].hash == hash){
            id = i
            break
        }
    }
    if(task[id]){
        task.splice(id, 1)
        localStorage.setItem(key, JSON.stringify(task))
        localStorage.setItem('TASK_NUM', task.length)
    }
    await CommonFunction.sleep(300)
    eventBus.$emit('UPDATE_TASK')
}

async function updateStatus(hash, status, value){
    const key = 'TASK_QUEUE_' + window.connectedAddress
    let task = localStorage.getItem(key)
    task = task ? JSON.parse(task) : []
    let id
    for(let i in task){
        if(task[i].hash == hash){
            id = i
            break
        }
    }
    if(task[id]){
        task[id].status = status
        task[id].statusValue = value
        task[id].statusTime = new Date().getTime()
        localStorage.setItem(key, JSON.stringify(task))
    }
    await CommonFunction.sleep(300)
    eventBus.$emit('UPDATE_TASK')
}

export default {
    add,
    remove,
    updateStatus
}
