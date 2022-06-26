
function toast(msg, brief, timeout, status){
    if(!timeout && typeof(brief) == 'number'){
        timeout = brief
        brief = null
    }
    if(typeof(timeout) == 'boolean'){
        status = timeout
    }
    if(typeof(brief) == 'boolean'){
        status = brief
    }
    if(typeof(status) == 'undefined'){
        status = true
    }
    const toastCon = document.getElementById('ToastCon')
    toastCon.setAttribute("class", "toast-con animate__animated animate__fadeInRightBig" + (!status ? ' error' : ''))
    toastCon.getElementsByClassName('title')[0].innerHTML = msg + '<span onclick="window.closeToast()">x</span>'
    if(brief){
        toastCon.getElementsByClassName('sub-title')[0].innerText = brief
    }
    setTimeout(() => {
        toastCon.setAttribute("class", "toast-con animate__animated animate__fadeOut" + (!status ? ' error' : ''))
    }, timeout || 3000)
    setTimeout(() => {
        toastCon.setAttribute("class", "")
    }, 6000)
}

window.closeToast = () => {
    const toastCon = document.getElementById('ToastCon')
    toastCon.setAttribute("class", "")
}

function loading(msg, timeout){
    const loadingCon = document.getElementById('LoadingCon')
    loadingCon.setAttribute("class", "loading-con animate__animated animate__fadeIn")
    document.getElementById('LoadingConMsg').innerText = msg || 'Loading...'
    if(timeout){
        setTimeout(() => {
            closeLoading()
        }, timeout)
    }
}

function closeLoading(){
    const loadingCon = document.getElementById('LoadingCon')
    loadingCon.setAttribute("class", "")
}

export default {
    toast,
    loading,
    closeLoading
}
