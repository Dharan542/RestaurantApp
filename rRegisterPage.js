var form = document.forms
var fEelements = form[0].elements;
var obj ={};
var flag=0;
var formData=[]
var logRegDiv = document.getElementById('logRegDiv');
logRegDiv.onclick = (e)=>{
    if(e.target.tagName == "BUTTON"){
        if(e.target.innerHTML == 'Login'){
            form[1].hidden = false;
            logRegDiv.hidden = true;
        }
        else{
            form[0].hidden = false;
            logRegDiv.hidden = true;
        }
    }
}
for(let y of fEelements ){
    if(y.name !== 'btn'&& y.name !== 'password'&& y.name !== 'confirmpassword')
        {
           formData.push(y.name.toUpperCase())
        }
}
localStorage.setItem("FormData",formData)



function objectCreator(){
    for(let y of fEelements ){
        if(y.name !== 'btn')
            {
               y.value!==""?(obj[y.name]=y.value):flag=1;
            }
    }
        if(flag==0)
        {
            try{
                var registeredRestaurants = JSON.parse(localStorage.Registered);
            }
            catch(err){
                var registeredRestaurants = [];
            }
            registeredRestaurants.push({[obj.username]:obj})
            localStorage.setItem("Registered",JSON.stringify(registeredRestaurants)) 
        }
        flag=0;
        obj={}  
}
var userCheck = []
var indication =0;
var valLogin;
form[1].onclick = function(e){
    var lFormElements = form[1].elements;
    if(e.target.tagName!=='BUTTON') return;
    for(let x of lFormElements){
        if(x.name!=='btn'){
            valLogin = x.value;
            x.name=='lUsername'? user= valLogin : null;
            x.name=='lPassword'? pass = valLogin:null;
        } 
    }
   checkUser(user,pass)
}

var user,pass;
var currentKey;
var arr1 = ["Accepted","Rejected"];
var rName;

function checkUser(user,pass){
lableName: for(let i of arr1){
        try{
            var Data = JSON.parse(localStorage[i])
        }
        catch(err){
            console.log("No data found")
            break lableName;
        }
        Data.forEach((element) => {
            for(let x in element){
                if(x==user){
                    indication=-1;
                  if(element[x].password==pass){
                    currentKey= i;
                    indication=1;
                  }
                  for(let y in element[x]){
                    y=='restaurantname'? rName = element[x][y]:null
                }
                } 

               
            }
        })
    }
    if(indication==1) {
        if(currentKey=='Rejected'){
            alert("You are not eligible")
        }
        else{
            form[1].hidden = true;
            form[2].hidden = false;
        }
       
        indication=0
    }
    else if(indication==-1){
        alert("Correct your password")
        indication=0
    } 

     else alert("please register")
}
// var menuTablesNumber = document.querySelectorAll('td')
// console.log(menuTablesNumber)
var menuForm = document.getElementById('detailsForm')
var firstMenuRow = document.getElementById('firstMenuRow')
var addMenuTable = document.getElementById('addMenuTable')
// firstMenuRow.removeAttribute('id')
var FoodArr=[];
var updatedFood = {}
menuForm.onclick = (e)=>{
    if(e.target.tagName != 'BUTTON') return;
    var allRowInTable = document.querySelectorAll('tr')
    if(e.target.innerHTML=='Add Menu'){
        var newMenuRow = firstMenuRow.cloneNode(true)
        addMenuTable.append(newMenuRow)
        
        
    }
    else if(e.target.innerHTML=='Remove'){
        if(addMenuTable.childElementCount>1){
            var child = addMenuTable.lastElementChild
            addMenuTable.removeChild(child)
        }
    }
   
    else if(e.target.innerHTML=='Submit'){
            var count=0;
            for(let n of allRowInTable){
                if(n.id=='firstMenuRow'){
                    var foodObj = {};
                    for(let e of n.children)
                    { 
                        var inputFoodValue = e.childNodes[0].value
                        var inputFoodName =  e.childNodes[0].name
                        if(inputFoodValue!=""){
                            foodObj[inputFoodName]=inputFoodValue;
                        }
                        else{
                           count=1
                        }
                        
                    }
                        if(Object.keys(foodObj).length>2)
                        { 
                            FoodArr.push(foodObj)
                        }  
                }
               
            }
            
           if(count==1){
            alert("Enter the details")
           }
           else{
            if(confirm("Are you sure want to save?")){
                updatedFood[rName]=FoodArr
                console.log(updatedFood)
                
                    detailsForm.hidden = true
                    finalUpdateTag.hidden = false
                    try{
                        var newFood = JSON.parse(localStorage["Foodlist"])
                        newFood[rName] = FoodArr
                        console.log(newFood)
                    }
                    catch(err){
                        var newFood = updatedFood;
                    }
                    localStorage.setItem("Foodlist",JSON.stringify(newFood))
                 
               }
           }
           
           FoodArr=[]
    }
}

// var obj = {}
// console.log(Object.keys(obj).length)
