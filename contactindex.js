const express=require('express');
const path=require('path');
const port = 8004;
const bodyparser =require('body-parser')

const db = require('./config/mongoose');
const Contact = require('./models/contact')


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded( ));      // #ta ={extented:true} in bracket
app.use(express.static('assets'));

// // USING MIDDLE WARE 1
// app.use(function(req,res,next){
//     console.log('middle ware 1 called ');
//     next();
// });

// // USING MIDDLE WARE 2

// app.use(function(req,res,next){
//     console.log('middle ware 2 called ');
//     next();
// });

// app.set('practice',path.join(__dirname,"practice"));   this was not required

var contactList= [
    {
        name: "Bob",
        phone:"11111111"
    },
    {
        name:"Attuu",
        phone:"222222"
    },
    {
        name:"ragh",
        phone:"33333333"
    },
]


app.get('/practice',function(req,res){
    return res.render("love",{'pyaar':'Its beautiful'});
});


app.get('/',function(req,res){
    // console.log(__dirname);

    // res.send('<h1>Cool it is running! or is it?</h1>');
    //console.log('from the get route controller',req.myName);

    // MongooseError: Model.find() no longer accepts a callback
    Contact.find({}, function(err,contacts){
        if (err){
            console.log("Error in fetching contacts from db");
            return;
        }

        return res.render('home',{'title':'My contact list',contact_list:contacts
        });    
    });

    // Contact.find({ })
     
    //     .then(function(contacts){
    //         return res.render('home',{'title':'My contact list',contact_list:contacts

    //     })
    //     .catch(function(err){
    //         console.log("Error in fetching contacts from db");
    //         return;
    //     });




    // return res.render('home',{'title':'My contact list',contact_list:contactList
 });


app.post('/create-contact',function(req,res){
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone:req.body.phone

    //     }
    // );
    contactList.push(req.body); 
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if (err){console.log('errror in creating contact');
        return;}
        console.log('******',newContact);
        return res.redirect('back');
    });
    // -- ta code
    // Contact.create({                         
    //         name: req.body.name,
    //         phone: req.body.phone
    //      })
    //      .then(function(newContact) {
    //          console.log('*******',newContact);
    //          return res.redirect('back');
    //      })
    //      .catch(function(err) {
    //          console.log('error in creating a contact!');
    //          return;
    //      });



    //return res.redirect('/');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // return res.redirect('/practice');
});


//      DELETING A CONTACT
app.get('/delete-contact/',function(req,res){
    //**console.log(req.query);
    //* comment--get the  queery from the url
    //* let phone=req.query.phone;

    // comment--get the id from query in the url
    let id=req.query.id;



//////** 
    // let contactIndex=contactList.findIndex(contact =>contact.phone == phone);
    // if (contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    //return res.redirect('back');
    //comment--fint the contact in the database using id and delete 
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting ');
            return;
        }
        return res.redirect('back');
    });

     
});


app.listen(port,function(err){
    if(err){
        console.log('Error in   running the server',err);
    }
    console.log('Yup!! My Express Server is running on port:',port);
});