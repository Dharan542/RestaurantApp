var wrapperDiv = document.getElementById('wrapperDiv')


class openPage{
    constructor(elem){
        this.elem = elem;
        elem.onclick = this.onClick.bind(this)
    }
    admin(){
        location.href = "adminPage.html"
    }
    rRegister(){
        location.href = "rRegisterPage.html"
    }
    customer(){
        location.href = "customerPage.html"
    }

    onClick(e){
        var action = e.target.dataset.action;
        if(action){
            this[action]();
        }
    }
}

new openPage(wrapperDiv)
// wrapperDiv.onclick = function(e){
//     var target = e.target;
//     if(target.tagName == 'BUTTON'){
//         target.innerHTML == 'Admin' ? location.href= "adminPage.html" :
//         target.innerHTML == 'Restaurant Register'? location.href= "rRegisterPage.html": location.href= "customerPage.html"
//     }
// }

