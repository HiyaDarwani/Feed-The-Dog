var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastfed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feed=createButton("Feed The Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
var lastfedref = database.ref("FeedTime")
lastfedref.on("value", function(data){
  lastfed = data.val()
})
console.log(lastfed)
  if(lastfed>=12){
    fill("Black")
    text("Last Time Feed : "+ lastfed %12 + "Pm", 400, 30)
  }else if(lastfed==0){
    fill("Black")
      text("Last Time Feed : 12 Am", 400, 30)
  }else{
    fill("Black")
    text("Last Time Feed :"+ lastfed + "Am", 400, 30)
  }

  
 
  //write code to display text lastFed time here
  /*fill("Black")
  textSize(15)
  text("Last Time Fed : ", 400, 30)*/

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodstockval = foodObj.getFoodStock();
  if(foodstockval<=0){
      foodObj.updateFoodStock(foodstockval*0);
  }else{
    foodObj.updateFoodStock(foodstockval - 1);
  }

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
