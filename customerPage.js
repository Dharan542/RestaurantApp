var customerBodyTag = document.getElementById('customerBodyTag');
var search = document.getElementById('search');
var mainDiv = document.getElementById('mainDiv');
var orderDiv = document.getElementById('orderDiv');
var localStorageCheck = JSON.parse(localStorage["Accepted"]);
var selectedRestaurant;
var mainDivStatus = false;
var foodLocalStorage = JSON.parse(localStorage["Foodlist"])
localStorageCheck.forEach(element => {
    for(let x in element){
        for(let y in element[x]){
            if(y=='restaurantname'){
                    var divWrapper = document.createElement('span');
                    divWrapper.id = "spanId"
                    var headTag = document.createElement('h1')
                    headTag.innerHTML = `${element[x][y].toUpperCase()}`
                    var locationTag = document.createElement('p')
                    locationTag.innerHTML = `${element[x].location.toUpperCase()}`
                    divWrapper.onclick = ()=>{
                       selectedRestaurant = element[x]
                       SpanClick()
                    }
                    divWrapper.append(headTag)
                    divWrapper.append(locationTag)
                    mainDiv.append(divWrapper)
            }
        }
    }
   });
   var spanInput;
customerBodyTag.onclick = (e)=>{
    if(e.target.innerHTML=='Search'){
        var searchInput = search.value;
        if(searchInput!=''&& e.target.innerHTML == 'Search' ){
        localStorageCheck.forEach(element => {
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
    if(e.target.innerHTML=='Add item'){
        e.target.innerHTML = "Added"
        var count =1;
        e.target.setAttribute("disabled",true)
       e.target.style.backgroundColor = 'gray'
        var target = e.target.closest('span')
        spanInput = target.children[2]
        var tagetHead = target.children[0].innerHTML
        var itemCount =target.children[2].value
       if(itemCount>0){
        rate =  +itemCount*+currentRate
        // itemCountDisplay.innerHTML=` ${currentRate}x${itemCount} = ${rate}`
        foodObj[tagetHead] = ` ${currentRate}x${itemCount} = ${rate}`
        console.log(foodObj)
       }
       else{
           alert("Item count not be Negative")
       }
       
    }
    
    

    if(e.target.innerHTML == 'Proceed to Payment'){
        for(let n in foodObj){
            var objectRate = foodObj[n].split(' = ')
            totalRate+= +objectRate[1]
        }
        if(totalRate!=0){
        console.log(totalRate)
        paymentDiv.after(ProceedBtn)
        paymentDiv.after(backBtn)
        e.target.innerHTML = "Pay to Confirm"
        orderDiv.hidden=true;
        paymentDiv.hidden = false;
        }
        else{
           alert("Select atleast one item")
        }
        
    }
}

var foodObj ={} 
var removeBtn;
var foodOrderremoveBtn = document.getElementById("foodOrderremoveBtn")
var rate=0;
var totalRate = 0;
var currentRate;
function SpanClick (){
    mainDivStatus = !mainDivStatus;
    mainDiv.hidden = mainDivStatus;
    orderDiv.hidden = false;
    var currentRestName = selectedRestaurant.restaurantname;
    var foodAreaHead = document.createElement('h1')
    foodAreaHead.innerHTML = 'Available foods'
    orderDiv.append(foodAreaHead)
    FoodlistTracker(currentRestName);
    orderDiv.after(ProceedBtn)
    ProceedBtn.hidden = false;
    orderDiv.after(backBtn)
    backBtn.hidden=false;
}

function FoodlistTracker(x){
      for(let n in foodLocalStorage){
          if(n==x){
              for(let foodMenu of foodLocalStorage[x]){
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
