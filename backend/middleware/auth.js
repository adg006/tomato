import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  // Check if the token is present in the request headers
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  // Verify the token using the secret key
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
