


function roleMiddleware(role){
    return (req,res,next)=>{
        console.log("USER FROM TOKEN:", req.user);
        if(req.user.role !== role){
            return res.status(401).send("Access denied");
        }
        next();
    }
}
module.exports=roleMiddleware;