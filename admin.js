
var data = localStorage.FormData.split(",")
// console.log(document.querySelectorAll('table'))
var tableSections = document.querySelectorAll('table')
var arr = ["Registered","Accepted","Rejected"]
var i =0;
for(let x of tableSections){
    console.log(x)
    x.id = `${arr[i]}`
    var headRow = document.createElement('tr')
    for(let y of data ){
        var newCol = document.createElement('td')
        newCol.innerHTML = `${y}`;
        headRow.append(newCol);
      }
    if(x.id=='Registered'){
        var v = document.createElement('td')
        v.innerHTML = "Status";
        headRow.append(v)
    }
    x.append(headRow);
    i++;
}

var targetRow;
var id;
var keys = JSON.parse(localStorage["Registered"]);
keys.forEach((element,value) => {
    for(let x in element){
        var newRow = document.createElement('tr');
        newRow.id = `${value}`
        console.log(newRow.id)
        for(let y in element[x]){
            if(y!=='password' && y!=='confirmpassword'){
                var registeredDetails = document.createElement('td')
                registeredDetails.innerHTML = `${element[x][y]}`
                newRow.append(registeredDetails)
            }
        }
    }
      
        var statusCol = document.createElement('td')
        var acceptBtn = document.createElement('button')
        acceptBtn.innerHTML = "Accept"
        var rejectBtn = document.createElement('button')
        rejectBtn.innerHTML = "Reject"
        statusCol.append(acceptBtn)
        statusCol.append(rejectBtn)
        newRow.append(statusCol)
    
        Registered.append(newRow)
})

// localStorageDataTracker()
// }

Registered.onclick = function(e){
    targetRow = e.target.closest('tr');
    var targetBtn = e.target;
    if(e.target.tagName !='BUTTON') return;
    id = targetRow.id;
    console.log(id)
    targetBtn.innerHTML == 'Accept'? currentDataPusher("Accepted","Registered"):currentDataPusher("Rejected","Registered");
}

function currentDataPusher(register,reject){
    targetRow.hidden = true;
    try{
       var restaurantData = JSON.parse(localStorage[register]);
       }
   catch(err){
       var restaurantData = [];
    }
       restaurantData.push(keys[id])
       localStorage[register] = JSON.stringify(restaurantData);
       keys.splice(id,1)
       localStorage[reject] = JSON.stringify(keys);
       location.reload()
}
// localStorage.removeItem("Rejected")

// var arr = [8,6,9,5]

var arr1 = ["Accepted","Rejected"];
for(let i of arr1){
    var currnElement = document.getElementById(i);
    try{
        var nkeys = JSON.parse(localStorage[i])
    }
    catch(err){
        var nkeys = [];
    }
    nkeys.forEach((element,value) => {
        for(let x in element){
            var newRow = document.createElement('tr');
            newRow.id = `${value}`
            for(let y in element[x]){
                if(y!=='password' && y!=='confirmpassword'){
                    var registeredDetails = document.createElement('td')
                    registeredDetails.innerHTML = `${element[x][y]}`
                    newRow.append(registeredDetails)
                }
            }
        }
            currnElement.append(newRow)
    })
}

