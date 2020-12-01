var dog, happyDog, database, foodS, foodStock;
var fedTime;
var lastFed,addFood,food,feed;
function preload()
{
  dog1 = loadImage("dogImg.png")
  dog2 = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();

  food = new Food();
  dog = createSprite(400,350,10,10);
  dog.addImage(dog1)
  dog.scale = 0.2;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
  background("white")
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    
    console.log("working")
  }
  food.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  drawSprites();
  text("Food remaining : "+foodS,170,200);

}
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS)
}

function writeStock(x){
if(x<=0){
  x=0
}
else{
  x = x-1;


}
database.ref('/').update({

  food:x
})
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })

}
function feedDog(){
  dog.addImage(dog2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

