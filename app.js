const http = require ('http');
const fs = require('fs');

http.createServer((request,response)=>{
    console.log(request.url);
    const file =request.url =='/' ? './WWW/index.html': `./WWW${request.url}`;

    if(request.url=='/login'){
        let data =[];
        request.on("data",value=>{
            data.push(value);
        }).on("end",()=>{
            let params = Buffer.concat(data).toString();
            console.log(params);
            response.write(params);
            response.end();
        });
    }

    fs.readFile(file, (error,data)=>{
        if(error){
            response.writeHead(404,{"Content-Type":"text/plain"});
            response.write("not found");
            response.end();
        }else{
            const extension = file.split('.').pop();
            switch(extension){
                case 'txt':
                    response.writeHead(200,{"Content-Type":"text/plain"});
                break; 
                case 'html':
                    response.writeHead(200,{"Content-Type":"text/html"});
                break;
                case 'jpeg':
                    response.writeHead(200,{"Content-Type":"text/jpeg"});
                break;
                case 'css':
                    response.writeHead(200,{"Content-Type":"text/css"});
                break;
                case 'js':
                    response.writeHead(200,{"Content-Type":"text/javascript"});
                break;
                case 'ico':
                    response.writeHead(200,{"Content-Type":"image/x-icon"});
                break;
                default: 
                response.writeHead(200,{"Content-Type":"text/plain"}); 
            }
            
            response.write(data);
            response.end();
        }
       
    });
    
}).listen(8888);