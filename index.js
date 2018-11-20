const { spawn } = require('child_process');
const fs = require("fs");

//crear proyecto
function create(name,board){

    var state = 0;

 
    const dir = spawn('cmd',[name]);
    
    
   setTimeout(function(){

        fs.mkdir("./"+name,function(err){
            console.log("Carpeta creada");
        });

        dir.stdin.write("cd "+name + "\n");
        console.log("cd "+name);
        
        setTimeout(function(){

            if(board  != ""){
                dir.stdin.write("platformio init --board "+board + "\n");
                console.log("platformio");
   
            }
            
        },1000);

   },500);

    dir.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);

        var info =  data.toString();

        if(info.search("/"+name) > -1){

            console.log("carpeta correcta");
            //creando proyecto
            state = 1;
            
        }
    });

    dir.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    });

    dir.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}

