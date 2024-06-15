import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
//@desc Register a user
//@routes POST/api/users/register
//@access private
const registerUser = expressAsyncHandler(async(req,res)=>
    {
        const {username,email,password}=req.body;
        if(!username || !email || !password)
            {
                res.status(400);
                throw new Error("All fields are mandatory");
            }
        const userAvailable=await User.findOne({email});
        if(userAvailable)
            {
                res.status(400);
                throw new Error("User already registered")
            }
            //Hashed Password
            const hashedPassword=await bcrypt.hash(password,10);
            console.log("Hashed Password:",hashedPassword);
            const user=await User.create(
                {
                    username,
                    email,
                    password:hashedPassword
                }
            );
            console.log(`User Created ${user}`);
            if(user)
                {
                    res.status(201).json({_id:user.id,email:user.email});
                }
            else
            {
                res.status(400);
                throw new Error("User data is not valid");
            }
        res.json({message:"login user"});
    });

//@desc Login  user
//@routes POST/api/users/login
//@access private
const loginUser = expressAsyncHandler(async(req,res)=>
    {
        const{email,password}=req.body;
        if(!email || !password)
            {
                res.status(400);
                throw new Error("All fields are mandatory");
            }
        const user=await User.findOne({email});
        //compare password with hashedpassword
        if(user && (await bcrypt.compare(password,user.password))){
            const token=jwt.sign(
          {
             username:user.username,
             email:user.email,
             id:user.id,
          },
          'Crk0e8Lf5J',
          {
            expiresIn:'1h',
          }
        );
        //2.Send Token.
        return res.status(200).send(token);
            
            // {
            //     const accessToken=jwt.sign(
            //         {
            //             user:{
            //                 username:user.username,
            //                 email:user.email,
            //                 id:user.id,
            //             },
            //         },process.env.ACCESS_TOKEN_SECRET,
            //     {expiresIn: "1hour"});
            //     res.status(200).json({accessToken});
            // }else{
            //     res.status(401);
            //     throw new Error("email or password is not valid");
            // }
       
    }});

//@desc Current user info
//@routes POST/api/users/current
//@access private
const currentUser = expressAsyncHandler(async(req,res)=>
    {
        res.json(req.user);
    });

export {registerUser,loginUser,currentUser};



   
        