const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
    }

    // Check if it starts with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token format. Use Bearer token' 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', {
      issuer: 'task-manager',
      audience: 'task-manager-users'
    });
    
    // Find user by ID
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found. Token is invalid' 
      });
    }

    // Add user info to request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired. Please login again' 
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    } else {
      return res.status(401).json({ 
        success: false,
        message: 'Token verification failed' 
      });
    }
  }
};

module.exports = auth;
