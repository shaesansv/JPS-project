const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'No token provided' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '92590b7c36e148d0cfa0d45f89980b7fe4073128fdb5ef549056b8cac9839ae4ca194799a6b7c755dba56e5588d9a1d2563104f0168e49b7ec252d910502eade');
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: { message: 'Invalid or expired token' }
    });
  }
};

module.exports = authMiddleware;
