const {generateToken} = require("../../lib/utilities")
const User = require("./model")

const services = {}

services.signup = async ({ firstName, lastName, username, password })=>{
    try {
        // check if username exists
        const user = await User.findOne({
            where: { username: username },
            attributes: ['id', 'username']
        });

        if(user) throw new Error("username already exists")

        const newUser = await User.create({ firstName, lastName, username, password});
        //send token
        const token = generateToken(newUser.dataValues)

        return  {token}
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }  
}

services.login = async ({username, password }, context)=>{
    try {
        //check if username exists
        const user = await User.findOne({
            where: { username: username },
            attributes: ['id', 'username', 'password']
        });
        //check if password match
        if(!user) throw new Error("invalid username or password")
        if(password != user.password) throw new Error("invalid username or password")
        
        //send token
        const token = generateToken(user.dataValues)
        context.res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        return  {token}
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }  
}

services.login_status = async (context)=>{
    try {
        if(context.req.decodedToken.id) return  {isLogedin: true}

        return {isLogedin: false}
        
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }  
}

services.get_user = async (context)=>{
    try {
        const user = await User.findOne({
            where: { 
                id: context.req.decodedToken.id
            },
            attributes: ["id", "firstName", "lastName", "username"]
        });
        if (!user) throw new Error('User not found')
        return  user.dataValues
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }   
}

services.logout = async (context)=>{
    try {
        // Clear the token cookie 

        context.res.cookie('token', '', { 
            httpOnly: true, 
            secure: false, 
            expires: new Date(0) // Set the expiration date to a past date 
        }); 

        console.log("hello")
        return {message: "Logged out successfully"};
        
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }  
}

module.exports = services