var ball;
var ball_new,database,ball_new_position,position;

function setup(){
    createCanvas(500,500);

    database=firebase.database();

    ball_new = createSprite(250,250,10,10);
    ball_new.shapeColor = "red";

    ball_new_position=database.ref("ball/position");
    ball_new_position.on("value",readPosition,showError);

}

function draw(){
    background("white");

    if(position!==undefined){

    
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

// function changePosition(x,y){
//     ball.x = ball.x + x;
//     ball.y = ball.y + y;
// }

function writePosition(x,y){
    database.ref("ball/position").set(
        {
            'x':position.x+x,
            'y':position.y+y  
        }
    )
}

function readPosition(data){
    position=data.val();
    console.log(position);

    ball_new.x=position.x;
    ball_new.y=position.y;

}

function showError(){
    console.log("error while reading data");
}