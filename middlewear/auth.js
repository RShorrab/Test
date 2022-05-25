const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const auth = () => {
    return async (req, res, next) => {
        try {
            console.log(req.headers['authorization']);
            const headerToken = req.headers['authorization']
            if (!headerToken ||
                headerToken == null ||
                headerToken == undefined ||
                headerToken.length == 0 ||!headerToken.startsWith(`${process.env.beareToken} `)) {
                res.json({ message: "in-valid header token bearer" })
            } else {
                const token = headerToken.split(' ')[1]
                console.log(token);
                if (!token ||
                    token == null ||
                    token == undefined ||
                    token.length == 0) {
                    res.json({ message: "in-valid  token " })

                } else {
                    const decoded = jwt.verify(token, process.env.tokenSignature)
                    console.log(decoded);
                    const findUser = await userModel.findById(decoded.id).select('email name')
                    if (!findUser) {
                        res.json({ message: "in-valid login user id" })
                    } else {
                        req.user = findUser
                        next()
                    }
                }
            }
        } catch (error) {
            res.json({ message: "catch error token", error })
        }
    }
}
module.exports = {
    auth
}