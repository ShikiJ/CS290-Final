const express = require('express'); 
const mysql = require('mysql');
const bodyParse = require('body-parser');



/**this part is for set up and fire mysql */
const db = mysql.createConnection({
	host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_liushiy',
    password: '4198',
    database: 'cs290_liushiy'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('connected to mysql'); 
});
/*this part is using express's route*/
const app = express();
app.use('/assets',express.static('assets'));

// this is for! work!  
app.set('port',process.argv[2]);

//This is for CORS 
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', 'http://web.engr.oregonstate.edu');
	res.append('Access-Control-Allow-Methods', 'GET,POST');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

/*this part require express handlebars */
const hbars = require('express-handlebars'); 
app.engine('handlebars',hbars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

/*this is to use middleware body-parse for post request */
const urlencodedparese = bodyParse.urlencoded({extended:false}); 

//this is a hiddent route to create database 
app.get('/createDB',(req, res)=>{
    let sql = 'CREATE DATABASE hw6'; 
    db.query(sql,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('database created');
    });
});

app.get('/createTable',(req, res)=>{
    let sql = 'CREATE TABLE workout(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL, reps int NOT NULL, weight int NOT NULL, date DATE NOT NULL, unit int NOT NULL, PRIMARY KEY(id))';    
    db.query(sql,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('table created');
        
    });
});

app.get('/insertx',(req,res)=>{
    let dummypost = {name:'Betty',reps:10, weight:20, date:'2014-7-12',unit:25};
    let sql = 'INSERT INTO workout SET ?';
    let query = db.query(sql,dummypost,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('A successful Insertion');
    });
});

// end of the hidden route 

app.get('/',(req, res)=>{
    // console.log('app.js-> / ');
    // 1: to fetch data from database +table and inject into home
    let sql = 'SELECT * FROM workout';
    let query = db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        // console.log(results);
        // 1.2 write a js function to loop through the array and create a table on every row
        //  res.render(JSON.stringify(results));
        res.send(results);
    });
    
});

app.get('/home',(req, res)=>{
    // console.log('app.js->get /home')
    res.render('home');
});

app.post('/insert', urlencodedparese ,(req,res)=>{
    //console.log(req.body.command);
    if(req.body.command == 0){
        console.log('int the add route: ',req.body);
        console.log(typeof(req.body.name));
        let dummypost = {name:'',reps:0, weight:0, date:'',unit:0};
        if(req.body.name!='' && req.body.reps!='' && req.body.weight!='' && req.body.date!='' && req.body.unit!=''){
            dummypost.name = req.body.name;
            dummypost.reps = req.body.reps;
            dummypost.weight = req.body.weight;
            dummypost.date = req.body.date;
            dummypost.unit = req.body.unit;
            
            let sql = 'INSERT INTO workout SET ?';
            let query = db.query(sql,dummypost,(err,result)=>{
                if(err){
                    throw err;
                }
                //console.log(result);
                //res.send('A successful Insertion');
                res.redirect('/home');
            });
        }
        else{
            res.send('some filed is empty');
        }
    }
    else if(req.body.command == 1){
        
        if(req.body.name!=null && req.body.reps !=null && req.body.weight!=null && req.body.date!=null && req.body.unit!=null){
            //var idnum = parseInt('text',);
            let sql =  `UPDATE workout SET name = '${req.body.name}', reps = '${req.body.reps}', weight = '${req.body.weight}', date = '${req.body.date}', unit = '${req.body.unit}' WHERE id = ${req.body.id}`;
            //let sql = `UPDATE workout SET name = 'Test', reps = 0 WHERE id = 5 `;
            let query = db.query(sql,(err,result)=>{
                if(err){
                    throw err;
                }
                //console.log(result);
                //res.send('A successful Insertion');
                res.redirect('/home');
            });
        }
        else{
            
            res.send('some filed is empty');
        }
        
    }
    else if(req.body.command == -1){
      //  console.log('delete route detected ');
        let sql = `DELETE FROM workout WHERE id = ${req.body.id}`;
        let query = db.query(sql,(err, result)=>{
            if(err)
            {
                throw err; 
            }
            res.redirect('/home');
        })
    }
    else{
        console.log('some thing went bad',req.body);
        res.send("something when terriblely wrong. Post command is broken");
    }
});


app.listen(app.get('port'),()=>{
    console.log('express listen to ' + app.get('port'));
});