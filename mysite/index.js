const http = require('http');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const mainRouter = require('./routes/main');

// 1. Environment Variables (dotenv)
dotenv.config({
    path: path.join(__dirname, 'config/app.env') // __dirname : 현재 디렉토리위치
});

// 2. Application Routers
const applicationRouter =  reuire('../routes');

// 3. Logger


// 4. Application Setup(middleware 달아주는것)
const application = express()
    // 1. static resources
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY))) // '/public'안해줘도 자동으로 / 생성
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
    .use('/', mainRouter);
   

// Server Setup
http.createServer(application)
    .on('listening', function(){
        console.info(`http server runs on ${process.env.PORT}`)
    })
    .on('error', function(error){
        switch(error.code){
            case 'EACCESS':
                console.error(`${process.env.PORT} require privileges`);
                process.exit(1); // exit(1) : 비정상종료, exit(0) : 정상종료
                break;
            case 'EADDRINUSE':
                console.error(`${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(process.env.PORT);