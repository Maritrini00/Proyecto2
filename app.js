const http = require ('http');
const fs = require('fs');

http.createServer((request,response) => {
    console.log(request.url);
    const file = request.url == '/' ? './WWW/index.html' : `./WWW${request.url}`;

    if(request.url == '/form'){
        let data = [];
        
        request.on("data", value => {
            data.push(value);
        }).on("end", () => {
            let params = Buffer.concat(data).toString();
            params += '\n';

            fs.appendFile("data.txt", params, (error) => {
                if (error){
                    response.writeHead(500,{"Content-Type":"text/plain"});
                    response.write("Error en el servidor");
                    response.end();
                }
            });

            console.log(params);
        });

        fs.readFile("./response.html", (error, html) => {
            if (error){
                response.writeHead(500,{"Content-Type":"text/plain"});
                response.write("Error en el servidor");
                response.end();
            }
            response.writeHead(200, {"Content-Type":"text/html"});
            response.end(html);
        });
    } else{
        fs.readFile(file, (error,data) => {
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
    }
}).listen(8888);