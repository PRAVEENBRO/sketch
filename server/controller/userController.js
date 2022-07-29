const UserSchema = require('../model/userSchema');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const { name, emailid, password } = req.body
        const user = await UserSchema.findOne({ emailid: emailid })
        if (!user) {
            const NewUser = new UserSchema({ name, emailid, password });
            NewUser.save().then(async () => {
                res.status(200).json({ error: false, message: "user registered", data: null });
            });
        } else {
            res.status(200).json({ error: true, message: "user already registered", data: null });
        }

    } catch (err) {
        res.status(200).json({ error: true, message: "registeration failed", data: null });
    }
};

const signin = async (req, res, next) => {

    try {
        const { emailid, password } = req.body;
        const loginuser = await UserSchema.findOne({ emailid: emailid });
        console.log(loginuser)
        if (loginuser) {
            const { name, _id } = loginuser;
            // unhash password
            if (loginuser?.password === password) {
                const token = jwt.sign({ emailid, name, _id }, process.env.SECRET_KEY);
                res.cookie('authtoken', token, { maxAge: 9000000000, httpOnly: true, secure: false })
                res.status(200).json({ error: false, message: "login successfull", accesstoken: token });
            } else {
                res.status(200).json({ error: true, message: "login failed", accesstoken: null });
            }
        } else {
            res.status(200).json({ error: true, message: "invalid credential", accesstoken: null });
        }
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        const { emailid, active } = req.body;
        console.log(emailid, active)
        const logout = await UserSchema.updateOne({ emailid: emailid }, { $set: { active: active } })
        res.send(logout)
    } catch (err) {

    }
}

module.exports = { signup, signin, logout }