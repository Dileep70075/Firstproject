

const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors')
const path = require('path');
const multer = require('multer');
// const upload = multer({dest:'uploads/'});

const app=express();
const port=3001
// app.set('views',path.join(__dirname,'views'));
app.use(cors());
app.use(bodyParser.json());
// app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const storage = multer.diskStorage({
    destination:'/uploads/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+
        path.extname(file.originalname));
    }
});
const upload= multer({storage:storage});

//database connection
mongoose.connect('mongodb://localhost:27017/Newlms')
.then(()=>{
console.log("database is connected");
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});
})
.catch((error)=>{
    console.error("database connection error");
})

// app.use(bodyParser.json());

// create model User

const User= mongoose.model('User',{
    name:String,
    email:String,
    dob:String,
    address:String,
    password:String,
    profileImage:String
});

//create model employee
const Employee=mongoose.model('Employee',{
    Firstname:String,
    lastname:String,
    email:String,
    password:String,
    countryCode:String,
    mobile:String,
    gender:String,

})

// create model for leave
const Leave=mongoose.model("Leave",{
    name:String,
    email:String,
    starting_date:String,
    ending_date:String
})

// create model for Holiday
const Holiday=mongoose.model("Holiday",{
    name:String,
    fromdate:String,
    todate:String,
    remark:String
})

const Department=mongoose.model('Department',{
    departmentname:String,
    manager:String,
    remark:String
})


//Signup api post

app.post('/Signup',upload.single('profileImage'),async(req,res)=>{
    const { name,email,dob,address,password}=req.body;
    
    try{
        const profileImagepath=req.file?req.file.path:'';
        const newUser= new User({name,email,dob,address,password,profileImage:profileImagepath});
        await newUser.save();
        res.json({message:'Signup Successfull'})

    }
    catch (error){
        console.error('error during signup',error);
        res.status(500).json({message:"interval server error"});

    }
});

// Holiday post api

app.post('/holiday',async(req,res)=>{
    const { name,fromdate,todate,remark}=req.body;

    try{
        const Holidays= new Holiday({name,fromdate,todate,remark});
        await Holidays.save();
        res.json({message:'Holiday added Successfull'})

    }
    catch (error){
        console.error('error during Adding holiday',error);
        res.status(500).json({message:"interval server error"});

    }
});

// Department post api

app.post('/department',async(req,res)=>{
    const { departmentname,manager,remark}=req.body;

    try{
        const Departments= new Department({departmentname,manager,remark});
        await Departments.save();
        res.json({message:'Departments added Successfull'})

    }
    catch (error){
        console.error('error during Adding Departments',error);
        res.status(500).json({message:"interval server error"});

    }
});

// empolye api 
app.post('/employee',async(req,res)=>{
    const { Firstname,lastname,email,password,countryCode,mobile,gender}=req.body;

    try{
        const newUser= new Employee({Firstname,lastname,email,password,countryCode,mobile,gender});
        await newUser.save();
        res.json({message:'Employee data save  Successfull'})

    }
    catch (error){
        console.error('error during employee data saving',error);
        res.status(500).json({message:"interval server error"});

    }
});

// login post api
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.findOne({email});
        // console.log(user)
        if(!user ||user.password!==password){
            // console.log("invalid email");
            res.status(401).json({message:'invalid email or password'});
        }
        
        res.json({message:'login successfully'});
        
    }
    catch{
        console.error("error during login");
        res.status(500).json({message:"interval server error"})
    }
});

// get employee api

app.get('/employee',async(req,res)=>{
    try {
        // fetch all employee from the database
        const employees= await Employee.find();
        // send the list of employee as a json response
        res.json({employees});

    } catch (error) {
      console.error('Error during employee getting ', error);  
      res.status(500).json({message:'internal server error'});
    }
})

// get holiday api
app.get('/holiday',async(req,res)=>{
    try {
        // fetch all employee from the database
        const holidays= await Holiday.find();
        // send the list of employee as a json response
        res.json({holidays});

    } catch (error) {
      console.error('Error during holiday getting ', error);  
      res.status(500).json({message:'internal server error'});
    }
})

// leave post  api 

app.post('/leave',async (req,res)=>{
    const { name,email,starting_date,ending_date}=req.body;

    try{
        const newUser= new Leave({name,email,starting_date,ending_date});
        await newUser.save();
        res.json({message:'leave  data save  Successfull'})

    }
    catch (error){
        console.error('error during leave data saving',error);
        res.status(500).json({message:"interval server error"});
    }
})

// get leave api 
app.get('/leave',async (req,res)=>{
    try {
        // fetch all employee from the database
        const leave= await Leave.find();
        // send the list of employee as a json response
        res.json({leave});

    } catch (error) {
      console.error('Error during leave  getting ', error);  
      res.status(500).json({message:'internal server error'});
    }
})

//  Department get api
app.get('/department',async (req,res)=>{
    try {
        // fetch all department data  from the database
        const departments= await Department.find();
        // send the list of employee as a json response
        res.json({departments});

    } catch (error) {
      console.error('Error during department  getting ', error);  
      res.status(500).json({message:'internal server error'});
    }
})

//delete api for leave
app.delete('/leave/:id', async(req,res)=>{
    try {
        const leaveid=req.params.id;
        const deleteleave=await Leave.findByIdAndDelete(leaveid);
        if(!deleteleave){
            return res.status(404).json({message:'leave not found'});
        }
        res.json({message: 'leave deleted successfull'});
    } 
    catch (error) {
        console.error('error during deleteing leave',error)
        res.json({message:"internal server error"})
        
    }
})

//  department delete api
app.delete('/department/:id', async(req,res)=>{
    try {
        const departmentid=req.params.id;
        const deletedepartment=await Department.findByIdAndDelete(departmentid);
        if(!deletedepartment){
            return res.status(404).json({message:'department not found'});
        }
        res.json({message: 'department deleted successfull'});
    } 
    catch (error) {
        console.error('error during deleteing department',error)
        res.json({message:"internal server error"})
        
    }
})

//delete api for employee
app.delete('/employee/:id', async(req,res)=>{
    try {
        const employeeid=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(employeeid)){
            return res.status(400).json({message:'Invalid id'})
        }
        const deleteemployee=await Employee.findByIdAndDelete(employeeid);
        if(!deleteemployee){
            return res.status(404).json({message:'employee not found'});
        }
        res.json({message: 'employee deleted successfull'});
    } 
    catch (error) {
        console.error('error during deleteing employee',error)
        res.json({message:"internal server error"})
        
    }
})

// delete api for holiday
app.delete('/holiday/:id', async(req,res)=>{
    try {
        const holidayid=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(holidayid)){
            return res.status(400).json({message:'Invalid id'})
        }
        const deleteholiday=await Holiday.findByIdAndDelete(holidayid);
        if(!deleteholiday){
            return res.status(404).json({message:'holiday not found'});
        }
        res.json({message: 'holiday deleted successfull'});
    } 
    catch (error) {
        console.error('error during deleteing holiday',error)
        res.json({message:"internal server error"})
        
    }
})