import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "You are Not Authorized. Login Again" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken.id) {
            req.body = req.body || {}; 
            req.body.userId = decodedToken.id;
            next();
        } else {
            return res.json({ success: false, message: "You are Not Authorized. Login Again" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;
