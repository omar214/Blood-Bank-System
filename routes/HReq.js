var express = require('express');
var router = express.Router();

// DataBase
const { rows } = require('mssql');
var db = require('../DB/DatabaseConfig');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/HReq',{title:"Blood Bank",css1:"reg",css2:"Preq",css3:"animate",scrp:"reg" ,isLogged:1})
});

router.post('/', async(req, res) =>{
    const BloodGroup =req.body.BloodGroup ; 
    const Quantity =req.body.Quantity ;
    // current data 
    var today = new Date();
    var curr_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    
    var org_Id_SQl =` select O_ID from ORGANIZATIONs WHERE LOGGED =1 `;
    let ID ;
    db.all(org_Id_SQl, 
      (err,rows) => {
        if (err || rows[0] == undefined ) 
        {
          console.log(err +  "\n\n\n\n\n\n  No Orgaization is logged  \n\n\n\n\n\n"); 
          return res.render('pages/HReq',{title:"Blood Bank",css1:"reg",css2:"Preq",css3:"animate",scrp:"reg", isLogged :0})
        }
        else 
          {
            ID= rows[0].O_ID
            var insert_Query=` INSERT INTO ORG_ORDER (Blood_Type, Req_Amount , Req_Date , Org_Id) 
            VALUES ('${BloodGroup}','${Quantity}','${curr_date}','${ID}') ;` 

            db.all(insert_Query, 
              (err) => {
                if (err) 
                {
                  res.render('pages/HReq',{title:"Blood Bank",css1:"reg",css2:"Preq",css3:"animate",scrp:"reg"})
                  return console.log(err);
                }
                else 
                return res.render('pages/Home', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "animate", scrp: "home" ,isLogged:1})
              })

          }  
        })
        
          
          // console.log(` my id is ${ID}  `)
          // console.log(`\n\n\n\\n\n  out scobe my id is ${ID}  \n\n\n\\n\n  `)
        });
        module.exports = router;
        