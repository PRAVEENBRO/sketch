const UserSchema = require("../model/userSchema")
const jwt = require('jsonwebtoken');

const Authenticate = async (req, res, next) => {

    next();

    try {
        const token = req?.cookies?.authtoken
        const verifyToken = jwt.verify("token", process.env.SECRET_KEY);
        const approved = await UserSchema.find({ emailid: verifyToken.emailid });
        if (approved) {
            next();
        } else {
            res.status(200).json({ error: true, message: "unauthorized user ", data: [] });
        }
    } catch (err) {
        res.status(200).json({ error: true, message: "Something went wrong...! ", data: null });
        next(err);
    }

}

module.exports = Authenticate;