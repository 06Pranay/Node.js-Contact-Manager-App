import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const validateToken=(req,res,next)=>
{
    //1.Read the token.
    const token =req.headers['authorization'];
    console.log(token);
    //2. if no token,return the error.
    if(!token)
        {
            return res.status(401).send('User is not Authorized');
        }
    //3. check if token is valid
       try{ const payload=jwt.verify(token,
            'Crk0e8Lf5J'
        );
        console.log(payload);
    }catch(err){
    //4.return error
    console.log(err);
   return res.status(401).send('Unauthorized');
}
   //5. call next middleware
   next()  ;
};
export default validateToken;

// const validateToken=expressAsyncHandler(async(req,res,next)=>
//     {
//       let token;
//       let authHeader=req.headers.Authorization || req.headers.authorization;
//       if(authHeader && authHeader.startsWith("Bearer"))
//         {
//             token=authHeader.split(" ")[1];
//             jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>
//             {
//                 if(err)
//                     {
//                         res.status(401);
//                         throw new Error("User is not Authorized");
//                     }
//                 req.user=decoded.user;
//                 next();
//             })
//         }
//     });
//     export default validateToken;
