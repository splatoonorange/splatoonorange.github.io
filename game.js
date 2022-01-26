/**
 * Created by lucidorangee / 오렝 (유튜브)
 */

 var ctx=document.getElementById('canv').getContext("2d")
 var canvas=document.getElementById('canv');
 var index=1;
 var data;
 var phase=0;
 var score=0;
 var timer=60;
 readTextFile("weaponinfo.json", function(text){
    data = JSON.parse(text); //parse JSON
});

 window.onload = function() {
    
    ctx.font="60px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Click anywhere to begin", 640, 360);
    
 }
window.addEventListener("mousedown", function(event) {
    var rect = canvas.getBoundingClientRect();
    console.log("width: " + rect.right);
    console.log("mouse at x: " + event.clientX + " y: " + event.clientY);
    var ratio = window.innerWidth / (rect.right-rect.left);
    console.log("Relative mouse position: " + (((event.clientX-rect.left)/window.innerWidth)*1280*ratio))   
    var mousex = (((event.clientX-rect.left)/window.innerWidth)*1280*ratio);

    if(phase == 0)
    {
        //Move the game to phase 1
        phase = 1;
        ctx.clearRect(0, 0, 1280, 720);
        ctx.font="60px monospace";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left"; 
        ctx.fillText(timer, 32, 64);

        //Timer
        var x = setInterval(function(){
            ctx.font="60px monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "left";
            timer--;
            ctx.clearRect(32, 6, ctx.measureText(timer).width, 60);
            ctx.fillText(timer, 32, 64);
        }, 1000);

        //display weapon and subs
        index = Math.floor((Math.random() * data.main.length) + 1);
    
        var imgname = data.main[index].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, 512, 0)
        showSubOptions();

        return;
    }
    if(phase == 1)
    {
        // Check for correctness
        var choice = -1;

        //Find what was clicked
        //First Row
        if(event.clientY > 420 && event.clientY < 420+142)
        {
            for(var i = 0; i < 6; i++){
                if(mousex > i*158+159 && mousex < i*158+159+142)
                {
                    choice = i;
                    break;
                }
            }
        }
        //Second Row
        else if(event.clientY > 580 && event.clientY < 580+142)
        {
            for(var i = 0; i < 7; i++){
                if(mousex > i*158+80 && mousex < i*158+80+142)
                {
                    choice = i;
                    break;
                }
            }
        }
        //No button is clicked
        if(choice == -1) return;

        //test purpose
        console.log("Chosen is " + data.sub[choice]);

        ctx.textAlign = "left";
        ctx.fillStyle = "#000000";
        ctx.clearRect(32, 70, ctx.measureText("Phase " + phase).width, 60);
        ctx.fillText("Phase " + phase, 32, 128);
        phase = 2;
        showSpecialOptions();

        //y 420 , 420+142
        //x first line i*158+159 (+142)
        //x second line (i-6)*158+80 (+142)

        
        

        return;
    }
    if(phase == 2)
    {
        phase = 1;
        ctx.clearRect(512, 0, 256, 256);
        index = Math.floor((Math.random() * data.main.length) + 1);
    
        var imgname = data.main[index].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, 512, 0)
        showSubOptions();
        console.log(data.main[index].name);
        console.log(data.main[index].subweapon);
        console.log(data.main[index].specialweapon);

        return;
    }

    
 });

 function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function showSubOptions(){
    ctx.fillStyle="#DCDCDC"
    ctx.clearRect(0, 360, 1280, 360);
    
    //Draw rectangles for subs
    for(let i = 0; i < 6; i++)
    {
        ctx.fillRect(i*158+159,420,142,142)
        var imgname = data.sub[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, i*158+166, 427, 128, 128)
    }

    for(let i = 6; i < 13; i++)
    {
        ctx.fillRect((i-6)*158+80,580,142,142)
        var imgname = data.sub[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, (i-6)*158+87, 587, 128, 128)
    }
}

function showSpecialOptions(){
    ctx.fillStyle="#DCDCDC"
    ctx.clearRect(0, 360, 1280, 360);
    
    //Draw rectangles for subs
    for(let i = 0; i < 8; i++)
    {
        ctx.fillRect(i*158+8,420,142,142)
        var imgname = data.special[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, i*158+15, 427, 128, 128)
    }

    for(let i = 8; i < 16; i++)
    {
        ctx.fillRect((i-8)*158+8,580,142,142)
        var imgname = data.special[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, (i-8)*158+15, 587, 128, 128)
    }
}

function showScore(){

}

