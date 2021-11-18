const http = require('http');
const path = require('path');
const express = require('express');

const mainRouter = require('./routes/main');
const helloRouter = require('./routes/hello');
const userRouter = require('./routes/user');
const port = 8080;

// Application Setup(middleware 달아주는것)
const application = express()
    // 1. static resources
    .use(express.static(path.join(__dirname, 'public'))) // '/public'안해줘도 자동으로 / 생성
    // 2. request body parser 
    .use(express.urlencoded({extended: true}))   // application/x-www-form-urlencoded 형식인것들 파싱해줌
    .use(express.json())                        // application/json
    // 3. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // 4. request router
    .all('*', function(req, res, next){
        res.locals.req = req;
        res.locals.res = res;
        next(); // 꼭 적어줘야 다음으로 넘어감
    })
    .use('/', mainRouter)
    .use('/hello', helloRouter)
    .use('/user', userRouter);


// Server Setup
http.createServer(application)
    .on('listening', function(){
        console.info(`http server runs on ${port}`)
    })
    .on('error', function(error){
        switch(error, code){
            case 'EACCESS':
                console.error(`${port} require privileges`);
                process.exit(1); // exit(1) : 비정상종료, exit(0) : 정상종료
                break;
            case 'EADDRINUSE':
                console.error(`${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(port);