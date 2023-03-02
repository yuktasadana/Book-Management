const userModel = require('../models/userModel')
const jwt  = require('jsonwebtoken')
const{valid,validEmail,validMobile,ValidName,isValidPincode} = require('../validator/validation')

const createUser = async function(req,res){
    try{

         const data = req.body

         if(Object.keys(data).length == 0){
            return res.status(400).send({status:false,message:"Request Body Can't be Empty"})
         }
         const {title,name,phone,email,password,address} = data;

          // Checking  titles
         if(!valid(title)){
            return res.status(400).send({status:false,message:"title is required"})
         }
         if(title != "Mr" && title !="Mrs" && title != "Miss"){
            return res.status(400).send({status:false,message:"title can only be Mr,Mrs,Miss"})
        }  
          // Checking  name 
        if(!valid(name)){
            return res.status(400).send({status:false,message:"name is required"})
        }
        if(!ValidName(name)){
            return res.status(400).send({status:false,message:"name is only accepted in alphabet"})
        }
        //checking phone
        if(!valid(phone)){
            return res.status(400).send({status:false,message:"phone number is required"})
        }
        if(!validMobile(phone)){
            return res.status(400).send({status:false,message:"phone number only in Indian Number"})  
        }

        const phoneRegistered = await userModel.findOne({phone:phone});
        if(phoneRegistered){
            return res.status(400).send({status:false,message:"phone number is already registered"})
        }
        //checking email
         if(!valid(email)){
             return res.status(400).send({status:false,message:"email is required"})
         }
         if(!validEmail(email)){
            return res.status(400).send({status:false,message:"email is invalid"})
         }

         const emailRegistered = await userModel.findOne({email:email});
         if(emailRegistered){
            return res.status(400).send({status:false,message:"email is already Registered"})
         }
        //checking password 

        if(!valid(password)){
            return res.status(400).send({status:false,message:"password is required"})
        }
        if(!(password.length >=8 && password.length <=15)){
            return res.status(400).send({status:false,message:"password is only accept between 8 to 15"})
        }

        //checking address
        if (address) {
            if (!valid(address.street)) {
                return res.status(400).send({ status: false, message: "Street address cannot be empty  ." })
            }
            if(!ValidName(address.street)){
                return res.status(400).send({status:false,message:"Street is only accepted in alphabet"})
            }
            if (!valid(address.city)) {
                return res.status(400).send({ status: false, message: "City cannot be empty  ." })
            }
            if (!valid(address.pincode)) {
                return res.status(400).send({ status: false, message: "Pincode cannot be empty." })
            }
            if(!isValidPincode(address.pincode)){
                return res.status(400).send({ status: false, message: "Pincode is invalid." })
            }
        }
        //.........................................
        // Validation ends
        const newUser = await userModel.create(data);
        return  res.status(201).send({ status: true, message: `User created successfully`, data: newUser });
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports.createUser = createUser

const loginUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please Provide some data" });
        }

        const { email, password } = data;

        if (!valid(email)) {
            return res.status(400).send({ status: false, message: "email is required" });
        }

        if (!validEmail(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid ` });
        }

        if (!valid(password)) {
           return  res.status(400).send({ status: false, message: "password is required" });
        
        }

        if (!(password.length >= 8 && password.length <= 15)) {        
            return res.status(400).send({ status: false, message: "Password should be accept min 8 and max 15 " })
        }
        const userDetails = await userModel.findOne({ email: email, password: password });  

        if (!userDetails) {
            return res.status(404).send({ status: false, message: " email or password incorrect or not found" });
           
        }

        const token = jwt.sign({
           userId: userDetails._id.toString(),
        }, "Book@Management",{ expiresIn: '1hr'})

        res.setHeader("x-api-key", token);
        
       return  res.status(200).send({ status: true, message: " you are successful login", data:{token:token}});
    } catch (error) {
       return  res.status(500).send({ status: false, message: error.message });
    }
}
module.exports.login = loginUser