const connect = require('connect');
const serveStatic = require('serve-static');
const connectRoute = require('connect-route');

const port = 8080;
const app = connect();

app.use(serveStatic(__dirname + "/public"));
app.use(connectRoute(function(router){
    router.get("/",function(req, resp){
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end('<h1>Main</h1>');
    });

    router.get("/user",function(req, resp){
        console.log(req._parsuUrl.query);

        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end('<h1>user</h1>');
    });

    router.get("/guestbook",function(req, resp){
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end('<h1>guestbook</h1>');
    });

    router.get("/board",function(req, resp){
        resp.writeHead(200, {
            'Content-Type': 'text/html'
        });
        resp.end('<h1>board</h1>');
    });
}));

app.listen(port, function(){
    console.log(`http server running on ${port}`);
});