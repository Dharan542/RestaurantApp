var customerBodyTag = document.getElementById('customerBodyTag');
var search = document.getElementById('search');
var mainDiv = document.getElementById('mainDiv');
var orderDiv = document.getElementById('orderDiv');
var paymentDetails = document.getElementById('paymentDetails');
let finalUpdateTag1 = document.getElementById('finalUpdateTag1');
let finalUpdateTag2 = document.getElementById('finalUpdateTag2');
var AcceptedList = JSON.parse(localStorage["Accepted"]); 
var selectedRestaurant;
var mainDivStatus = false;
var foodLocalStorage = JSON.parse(localStorage["Foodlist"])
import obj from './admin.js'
console.log(obj)
AcceptedList.forEach(element => {
    for(let x in element){
        for(let y in element[x]){
            if(y=='restaurantname'){
                if(foodLocalStorage[element[x][y]] != undefined){
                    var divWrapper = document.createElement('span');
                    divWrapper.id = "spanId"
                    var headTag = document.createElement('h1')
                    headTag.innerHTML = `${element[x][y].toUpperCase()}`
                    var locationTag = document.createElement('p')
                    locationTag.innerHTML = `${element[x].location.toUpperCase()}`
                    divWrapper.onclick = ()=>{
                       selectedRestaurant = element[x][y]
                       
                       SpanClick()
                    }
                    divWrapper.append(headTag)
                    divWrapper.append(locationTag)
                    mainDiv.append(divWrapper)
                }
            }
        }
    }
   });
   var spanInput;
   var itemCount=1 ,count = 1 ,orderArr = [];
 
customerBodyTag.onclick = (e)=>{
    if(e.target.innerHTML=='Search'){
        var searchInput = search.value;
        if(searchInput!=''&& e.target.innerHTML == 'Search' ){
        AcceptedList.forEach(element => {
         for(let x in element){
             for(let y in element[x]){
                 if(y=='restaurantname'){
                     if(searchInput==element[x][y]){
                        var restaurantName = document.getElementById(searchInput);
                        mainDiv.prepend(restaurantName)
                     }
                 }
             }
         }
        });
     }
     else{
         alert("Enter the input")
     }
        search.value=''
    }
    if(e.target.innerHTML=='Back'){
        location.reload()
    }
    if(e.target.type=='number'){
        let addBtn = e.target.nextSibling
        let currnCount = e.target.value;
        if(currnCount!=itemCount){
            addBtn.innerHTML = "Add item"
            addBtn.style.backgroundColor = 'darkblue'
        }
    }
    if(e.target.innerHTML=='Add item'){
        e.target.innerHTML = "Added"
       e.target.style.backgroundColor = 'gray'
        var target = e.target.closest('span')
        spanInput = target.children[2]
        var targetHead = target.children[0].innerHTML
        itemCount =target.children[2].value
        console.log(itemCount)
       if(itemCount>0){
        rate =  +itemCount*+currentRate
        foodObj[targetHead] = ` ${currentRate}x${itemCount} = ${rate}`
        console.log(foodObj)
       }
       else{
           alert("Item count not be Negative")
       }  
    }
    if(e.target.innerHTML == "Pay to Confirm"){
        finalUpdateTag2.hidden = false;
        finalUpdateTag1.hidden = false;
        e.target.hidden = true;
        // try{
        //     for(let n in foodLocalStorage[selectedRestaurant]["order"]){count++}
        //     if(foodLocalStorage[selectedRestaurant]["order"]==undefined) 
        //      throw Error
        // }catch{
        //     foodLocalStorage[selectedRestaurant]["order"] = {};
        // } 
        // foodLocalStorage[selectedRestaurant]["order"][`order${count}`] = 'pending'
        // localStorage['Foodlist'] = JSON.stringify(foodLocalStorage)
           
     }
    if(e.target.innerHTML == 'Proceed to Payment'){
        for(let dishes in foodObj){
            var objectRate = foodObj[dishes].split(' = ')
            totalRate+= +objectRate[1]
            let dish = document.createElement('h4')
            dish.innerHTML = `${dishes} - ${objectRate[0]} = ${objectRate[1]}`
            paymentDetails.append(dish)
            console.log(objectRate)
        }
        if(totalRate!=0){
        let totalRateTag = document.createElement('h1')
        totalRateTag.style.color = "Green"
        totalRateTag.innerHTML = totalRate;
        paymentDetails.append(totalRateTag)
        paymentDiv.after(ProceedBtn)
        paymentDiv.after(backBtn)
        
        orderDiv.hidden=true;
        paymentDiv.hidden = false;
        e.target.innerHTML = "Pay to Confirm"
        }
        else{
           alert("Select atleast one item")
        }
        
    }
   
}

var foodObj ={} 
var removeBtn;
var rate=0;
var totalRate = 0;
var currentRate;
function SpanClick (){
    mainDivStatus = !mainDivStatus;
    mainDiv.hidden = mainDivStatus;
    orderDiv.hidden = false;
    var foodAreaHead = document.createElement('h1')
    foodAreaHead.innerHTML = 'Available foods'
    orderDiv.append(foodAreaHead)
    FoodlistTracker(selectedRestaurant);
    orderDiv.after(ProceedBtn)
    ProceedBtn.hidden = false;
    orderDiv.after(backBtn)
    backBtn.hidden=false;
}

function FoodlistTracker(x){
      for(let rName in foodLocalStorage){
          if(rName==x){
              for(let foodMenu of foodLocalStorage[x]["menu"]){
                  console.log(foodMenu)
                 var foodItemDiv = document.createElement('span')
                 var foodItemHead = document.createElement('h2')
                 foodItemHead.innerHTML = `${foodMenu.foodname.toUpperCase()}`
                 var foodRate = document.createElement('h3')
                 foodRate.style.color = "Brown"
                 foodRate.innerHTML = `Rs.${foodMenu.foodrate}`
                var foodOrderBtn = document.createElement('button')
                foodOrderBtn.innerHTML = "Add item"
                foodOrderBtn.onclick=()=>{ 
                    currentRate = foodMenu.foodrate        
                }
                var inputTag = document.createElement('input')
                inputTag.type = "number"
                inputTag.value = '1'
                inputTag.style.width = "30px"
                 foodItemDiv.append(foodItemHead)
                 foodItemDiv.append(foodRate)
                 foodItemDiv.append(inputTag)
                 foodItemDiv.append(foodOrderBtn)
                 orderDiv.append(foodItemDiv)
              }
          }
      }
}


//  delete foodLocalStorage["Hotel1"]["order"]
// localStorage['Foodlist'] = JSON.stringify(foodLocalStorage) 