// If not logged in, redirect to login
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google"); 
}
