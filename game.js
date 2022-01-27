/**
 * Created by lucidorangee / 오렝 (유튜브)
 */

 var ctx=document.getElementById('canv').getContext("2d")
 var canvas=document.getElementById('canv');
 var fgcanvas=document.getElementById('fg')
 var index=1;
 var data;
 var phase=-1;
 var score=0;
 var timer=60;
 var correct=true;
 readTextFile("weaponinfo.json", function(text){
    data = JSON.parse(text); //parse JSON
});

 window.onload = function() {
    ctx.font="60px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Click anywhere to begin", 640, 360);
    phase = 0;
    
 }
window.addEventListener("click", function(event) 
{
    var rect = canvas.getBoundingClientRect();
    //console.log("height: " + (rect.bottom - rect.top));
    //console.log("mouse at x: " + event.clientX + " y: " + event.clientY);
    
    var ratio = window.innerWidth / (rect.right-rect.left);
    //console.log("Relative mouse x position: " + (((event.clientX-rect.left)/window.innerWidth)*1280*ratio))   
    var mousex = (((event.clientX-rect.left)/window.innerWidth)*1280*ratio);

    ratio = 720/(rect.bottom - rect.top);
    //console.log("Relative mouse y positoin: " + (event.clientY - rect.top)*ratio);
    var mousey = (event.clientY - rect.top)*ratio;

    //console.log("Length: " + data.main.length)
    if(mousex < 0 || mousex > 1280 || mousey < 0 || mousey > 720) return;
    //console.log("x: " + mousex + " y: " + mousey);

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
        var x = setInterval(function()
        {
            ctx.font="60px monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "left";
            
            if(phase != 3){
                ctx.clearRect(32, 6, ctx.measureText(timer).width, 60);
                timer--;
                ctx.fillText(timer, 32, 64);

                if(timer<=0)
                {
                    ctx.clearRect(0, 0, 1280, 720);
                    ctx.fillText("DONE", 32, 64);
                    phase = 3;
                    timer = 2;
                }
            }
            else if(timer <= 0)
            {
                phase = 0;
                showScore();
                clearInterval(x);
            }
        }, 1000);

        //display weapon and subs
        index = Math.floor(Math.random() * data.main.length);
    
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
        if(mousey > 402 && mousey < 402+142)
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
        else if(mousey > 562 && mousey < 562+142)
        {
            for(var i = 0; i < 7; i++){
                if(mousex > i*158+80 && mousex < i*158+80+142)
                {
                    choice = i+6;
                    break;
                }
            }
        }
        //No button is clicked
        if(choice == -1) return;

        //set correct to false, which will give incorrect
        //  even if special is correct
        if(data.sub[choice].name != data.main[index].subweapon){
            
            warnIncorrect();
            ctx.font="60px monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "left";
            ctx.clearRect(32, 6, ctx.measureText(timer).width, 60);
            timer -= 2;
            ctx.fillText(timer, 32, 64);

            phase = 1;
            correct=true;
            ctx.clearRect(512, 0, 256, 256);
            index = Math.floor(Math.random() * data.main.length);
            console.log("Grabbing index number " + index);

            var imgname = data.main[index].imagename.replace(".png","");
            var img = document.getElementById(imgname);
            ctx.drawImage(img, 512, 0)
            showSubOptions();
            return;

        }

        phase = 2;
        showSpecialOptions();

        //y 402 , 402+142
        //x first line i*158+159 (+142)
        //x second line (i-6)*158+80 (+142)

        
        

        return;
    }
    if(phase == 2)
    {
        // Check for correctness
        var choice = -1;

        //Find what was clicked
        //First Row
        if(mousey > 402 && mousey < 402+142)
        {
            for(var i = 0; i < 8; i++){
                if(mousex > i*158+16 && mousex < i*158+16+142)
                {
                    choice = i;
                    break;
                }
            }
        }
        //Second Row
        else if(mousey > 562 && mousey < 562+142)
        {
            for(var i = 0; i < 8; i++){
                if(mousex > i*158+16 && mousex < i*158+16+142)
                {
                    choice = i+8;
                    break;
                }
            }
        }
        //No button is clicked
        if(choice == -1) return;

        //test purpose
        console.log("Chosen is " + data.special[choice].name);

        if(data.special[choice].name == data.main[index].specialweapon && correct){
            ctx.textAlign = "left";
            ctx.fillStyle = "#000000";
            ctx.clearRect(32, 72, ctx.measureText("Current:" + score).width, 60);
            score++;
            ctx.fillText("Current:" + score, 32, 128);
        }
        else
        {
            warnIncorrect();
            ctx.font="60px monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "left";
            ctx.clearRect(32, 6, ctx.measureText(timer).width, 60);
            timer -= 2;
            ctx.fillText(timer, 32, 64);
        }

        phase = 1;
        correct=true;
        ctx.clearRect(512, 0, 256, 256);
        index = Math.floor(Math.random() * data.main.length);
    
        var imgname = data.main[index].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, 512, 0)
        showSubOptions();
        //console.log(data.main[index].name);
        //console.log(data.main[index].subweapon);
        //console.log(data.main[index].specialweapon);

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
        ctx.fillRect(i*158+159,402,142,142)
        var imgname = data.sub[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, i*158+166, 409, 128, 128)
    }

    for(let i = 6; i < 13; i++)
    {
        ctx.fillRect((i-6)*158+80,562,142,142)
        var imgname = data.sub[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, (i-6)*158+87, 569, 128, 128)
    }
}

function showSpecialOptions(){
    ctx.fillStyle="#DCDCDC"
    ctx.clearRect(0, 360, 1280, 360);
    
    //Draw rectangles for subs
    for(let i = 0; i < 8; i++)
    {
        ctx.fillRect(i*158+16,402,142,142)
        var imgname = data.special[i].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, i*158+24, 409, 128, 128)
        
        ctx.fillRect(i*158+16,562,142,142)
        var imgname = data.special[i+8].imagename.replace(".png","");
        var img = document.getElementById(imgname);
        ctx.drawImage(img, i*158+24, 569, 128, 128)
    }
}

function warnIncorrect(){
    fgcanvas.style.opacity=0.5;
    var warn_fadeout = setInterval(function()
    {
        if(fgcanvas.style.opacity>0)
            fgcanvas.style.opacity-=0.05;
        else clearInterval(warn_fadeout);
    }, 20);
}

function showScore(){
    ctx.clearRect(0, 0, 1280, 720);    
    ctx.font="60px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Final Score: " + score, 640, 240);
    if(score < 5)
        ctx.fillText("ㅋ", 640, 360);
    ctx.fillText("Click anywhere to begin", 640, 480);
    timer = 60;
    score = 0;
    correct = true;
}

