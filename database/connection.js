import mysql from 'mysql2';
import config from 'config';

let USER = config.get('USER');
let HOST = config.get('HOST');
let PASSWORD = config.get('PASSWORD');
let DATABASE = config.get('DATABASE');

const db = mysql.createConnection({
    user: USER,
    host: HOST,
    password: PASSWORD,
    database: DATABASE,
})

db.connect((err)=>{
    if(!!err){
        console.log(err)
    } else {
        console.log("Database Connected!")
    }
})

export default db