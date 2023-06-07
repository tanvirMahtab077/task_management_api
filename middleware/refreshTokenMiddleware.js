var jwt = require("jsonwebtoken");

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.Jwt_SECRET_Key, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    const token = jwt.sign({id:user.id}, process.env.Jwt_SECRET_Key,{
        expiresIn:'1hr'
      }) 
    res.cookie(
      String(user.id, token, {
        path: "/",
        expires: new Date(Date.now() + 100000 * 36),
        httpOnly: true,
        sameSite: "lax",
      })
    );

    req.id = user.id;
  });
  next();
};

exports.refreshToken = refreshToken;
