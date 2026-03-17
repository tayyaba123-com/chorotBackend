 async function regitserUser(req,res,next){
  
   return res.status(201).json({
    "message":"User created successfuly"
   })
}

export default regitserUser