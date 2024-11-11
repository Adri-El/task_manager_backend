const jwt = require('jsonwebtoken');
//const utilities = re
const {setReq} = require("./variables")
const middleware = {}


middleware.bodyParser = (req, res, next)=>{
    let buffer = ''
    let exceededDataLimit = false
    req.on('data', (dataStream)=>{

        if(Buffer.byteLength(dataStream, 'utf8') > Math.pow(2, 24)){
            exceededDataLimit = true
        }
        buffer += dataStream
    })

    req.on('end', ()=>{
        if(!exceededDataLimit){
            req.body = buffer
            next()  
        }
        else{
            utilities.setResponseData(res, 400, {'content-type': 'application/json'}, {statusCode: 400, msg:'Data sent is too large'}, true )
            
        }
        
    })
}

middleware.decodeToken = async (req, res, next)=>{
    if(!req.cookies.token) return res.status(401).json({ error: 'unauthorized' });
    // Check if the token is valid
    jwt.verify(req.cookies.token, process.env.jwtKey, (err, decoded)=>{ 
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        } 
        req.decodedToken = decoded;
        setReq(req)
        next()
    })
   
     
}



module.exports = middleware