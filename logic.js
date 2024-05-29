let elementsInArray = 7;
let numArray = [];
let maxNumInArray = 0;
let maxNumIndex = 0;
let timeInterval;

function createRandomNums(){
elementsInArray = 7;
numArray = [];
maxNumInArray = 0;
maxNumIndex = 0;
for (let i=0; i<elementsInArray; i++){
        let randNum = Math.floor(Math.random()*100)
        numArray.push(randNum);
        if (randNum > maxNumInArray){
            maxNumInArray = randNum;
            maxNumIndex = i;
        }
    }
}

function start_button_pressed(){
    if($("#start-button").html()=="Start"){
        createRandomNums();
        $("#start-button").html("Reset");
        $("#next-button").prop("disabled", false);
        $("#store-button").prop("disabled", false);

        for (let i=0; i<elementsInArray; i++){
            $("#item"+i).html(numArray[i]);
        }
        $("#item0").addClass("array-element-is-active");
        increment_timer();
    }
    else{
        createRandomNums();
        $("#start-button").html("Start");
        $("#next-button").prop("disabled", true);
        $("#store-button").prop("disabled", true);
        for (let i=0; i<elementsInArray; i++){
            $("#item"+i).removeClass("array-element-is-active").removeClass("correct-largest").removeClass("incorrect-largest");
        }
        $("#maxitem").removeClass("array-element-is-active")
        restart_timer()
    }
}

function update_best_time(){
    let current_time = $("#curr-time").html();
    let best_time = $("#best-time").html();
    if(best_time == 0 || parseInt(current_time) < parseInt(best_time)){
        $("#best-time").html(current_time);
        $("#clear-time-button").prop("disabled", false);
    }
}

function next_button_pressed(){
    if($("#item6").hasClass("array-element-is-active")){
        $("#next-button").prop("disabled", true);
        $("#store-button").prop("disabled", true);
        for(let i=0; i<elementsInArray;i++){
            $("#item"+(i)).addClass("array-element-is-active");
        }
        if($("#maxitem").html()==maxNumInArray){
            $("#item"+maxNumIndex).addClass("correct-largest");
            update_best_time();
        }
        else{
            $("#item"+maxNumIndex).addClass("incorrect-largest");
        }
        pause_timer();
        return;
    }
    
    for (let i=0; i<elementsInArray-1; i++){
        if($("#item"+i).hasClass("array-element-is-active")){
            $("#item"+i).removeClass("array-element-is-active");
            $("#item"+(i+1)).addClass("array-element-is-active");
            break;
        }
    }
}

function store_button_pressed(){
    for (let i=0; i<elementsInArray; i++){
        if($("#item"+i).hasClass("array-element-is-active")){
            $("#maxitem").addClass("array-element-is-active");
            $("#maxitem").html($("#item"+i).html());
            break;
        }
    }
}

function increment_timer(){
    timeInterval = window.setInterval(function() {
        $("#curr-time").html(String(parseInt($("#curr-time").html())+1))
    }, 1000);
}

function pause_timer(){
    window.clearInterval(timeInterval);
    timeInterval = undefined;
}

function restart_timer(){
    window.clearInterval(timeInterval);
    timeInterval = undefined;
    $("#curr-time").html("0");
}

function clear_best(){
    $("#best-time").html("0");
    $("#clear-time-button").prop("disabled", true);
}
