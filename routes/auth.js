import express from "express";
import passport from "passport";

const router = express.Router();

// Start Google login
router.get(
  "/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email"]
  })
);

// Callback after Google login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    res.redirect("/success"); 
  }
);

// Success page
router.get("/success", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");
  const name = req.user.displayName || "User";
  res.send(`
    <html>
      <head>
        <title>Welcome</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            margin-top: 50px;
            background: #f5f5f5;
          }
          .box {
            background: white;
            display: inline-block;
            padding: 30px 50px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          a {
            display: inline-block;
            margin-top: 15px;
            color: #0077cc;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Welcome, ${name}!</h1>
          <p>You’ve successfully logged into Starlight Cinema.</p>
          <a href="/employees">Go to Employees</a> |
          <a href="/positions">View Positions</a> |
          <a href="/auth/logout">Logout</a>
        </div>
      </body>
    </html>
  `);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send("Logout error");
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

export default router;
