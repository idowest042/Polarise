import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // ✅ safer than req.body.userId
    next();
  } catch (error) {
    console.log(error, "error in authMiddleware");
    return res.status(401).json({ message: "Invalid token" });
  }
};
