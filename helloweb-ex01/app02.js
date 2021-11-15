const http = require('http');
const fs = require('fs');

const port = 8080;
const server = http.createServer(function(req, resp){
    console.log(req.url);

    if(req.url === '/'){ // 특정파일을 지정하지 않음
        req.url = '/index.html';
    }

    fs.readFile(`${__dirname}/public${req.url}`, function(error, data){ // 콜백규정 : error, data (error가 없으면 null(순서지키기))
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end(data);
    });
    
});

server.listen(port, function(){
    console.log(`http server running on ${port }`);
})