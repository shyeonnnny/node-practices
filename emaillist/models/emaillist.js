const mysql = require('mysql2');
const dbconn = require('./dbconn');
const util = require('util');

module.exports={
    findAll: async function(callback){ // await를 밑에 쓰기때문에 async를 달아줌
        const conn = dbconn();
        // const conn = mysql.createConnection({
        //     host: '127.0.0.1',
        //     port:  3306,
        //     user: 'webdb',
        //     password: 'webdb',
        //     database: 'webdb'
        // });

        // 1. 기본적인 방법
        // const query = function(sql, data) {
        //     return new Promise(function(resolve, reject){
        //         conn.query(sql,[],function(error, results, field){
        //             return error ? reject(error) : resolve(results);
        //         })
        //     })           
        // }
        
        // 2. 1번에서 arrow 방법 적용
        // const query = (sql, data) => 
        //         new Promise((resolve, reject) => 
        //             conn.query(sql,[], (error, results, field) => (error ? reject(error) : resolve(results))))           
        
        // 3. 1,2번과 동일한 결과가나오지만 util에서 문장을 만들어줌
        const query = util.promisify(conn.query).bind(conn);
        
        try{
            return await query('select no, first_name as firstName, last_name as lastName, email from emaillist order by no desc', []);
        } catch(e) {
            console.error(e)
        } finally {
            conn.end();
        }
    },
    insert: async function(emaillist){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try{
            return await query('insert into emaillist(first_name, last_name, email) values (?, ?, ?)', Object.values(emaillist));
        } catch(e) {
            console.error(e)
        } finally {
            conn.end();
        }
    }
}