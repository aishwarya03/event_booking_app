export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({
      success: false,
      message: `Access denied. ${role} role required.`,
    });
  }

  next();
};
