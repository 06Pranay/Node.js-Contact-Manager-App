import constants from "../constants.js";
const errorHandler=(err,req,res,next)=>
    {
        const statusCode=res.statusCode ? res.statusCode:500;
        switch(statusCode)
        {
            case constants.VALIDATION_ERROR:
                res.json({title:"Validation Failed",message:err.message,stackTrace:err.stack});
                break;
            case constants.NOT_FOUND:
                res.json({title:"Not found",message:err.message,stackTrace:err.stack});
                break;
            case constants.UNAUTHORIZED:
                    res.json({title:"Un Authorized",message:err.message,stackTrace:err.stack});
                    break;
            case constants.FORBIDDEN:
                    res.json({title:"Forbidden",message:err.message,stackTrace:err.stack});
                    break;
             
            case constants.SERVER_ERROR:
                    res.json({title:"SERVER ERROR",message:err.message,stackTrace:err.stack});
                    break;
             
                    
            default:
                console.log("No Error,All good!");
                break;

        }
        
        
    };
    export default errorHandler;