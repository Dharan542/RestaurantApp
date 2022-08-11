
var data = localStorage.FormData.split(",")
var tableSections = document.querySelectorAll('table')
var arr = ["Registered","Accepted","Rejected"]
var i =0;
for(let x of tableSections){
    x.id = `${arr[i]}`
    var headRow = document.createElement('tr')
    for(let y of data ){
        var newCol = document.createElement('td')
        newCol.innerHTML = `${y}`;
        headRow.append(newCol);
      }
        var v = document.createElement('td')
        v.innerHTML = "Status";
        headRow.append(v)
    
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

Registered.onclick = function(e){
    targetRow = e.target.closest('tr');
    var targetBtn = e.target;
    if(e.target.tagName !='BUTTON') return;
    id = targetRow.id;
    console.log(id)
    targetBtn.innerHTML == 'Accept'? currentDataPusher("Accepted","Registered"):currentDataPusher("Rejected","Registered");
}

function currentDataPusher(btnName,register){
    targetRow.hidden = true;
    try{
       var restaurantData = JSON.parse(localStorage[btnName]);
       }
   catch(err){
       var restaurantData = [];
    }
       restaurantData.push(keys[id])
       localStorage[btnName] = JSON.stringify(restaurantData);
       keys.splice(id,1)
       localStorage[register] = JSON.stringify(keys);
       location.reload()
}

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
                var statusCol = document.createElement('td')
                var removeBtn = document.createElement('button')
                removeBtn.innerHTML = "Remove"
                removeBtn.onclick = (e)=> {
                    let deletionRestaurantName = e.target.closest('tr').cells[2].innerHTML
                    let deleteFoodList = JSON.parse(localStorage.Foodlist)
                    delete deleteFoodList[deletionRestaurantName]
                    localStorage["Foodlist"] = JSON.stringify(deleteFoodList)
                    let currTable = e.target.closest('table').id
                    let updateList = JSON.parse(localStorage[currTable])
                    updateList.splice(value,1)
                    localStorage[currTable] = JSON.stringify(updateList)
                    location.reload()
                }
                statusCol.append(removeBtn)
                newRow.append(statusCol)
            }
                currnElement.append(newRow)
        })
    }
//    let arr2 = [1,2,3,4,5]

//    arr2.map((item)=>{item*2})
//    arr2.forEach((item)=>{item*2})
//    console.log(arr2)

    let obj = {
        name:"Dharan",
        age:21,
        }
    console.log(obj.name)

    export default obj;

    // const person = {
    //     firstName:"John",
    //     lastName: "Doe",
    //     display: function () {
    //       console.log(this.firstName + " " + this.lastName);
    //     }
    //   }
    // //   let disp = person.display
    //   console.log(this)
    //   setTimeout(person.display.bind(person), 3000);