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
    res.redirect("/auth/success"); 
  }
);

// Success page
router.get("/success", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");
  const name = req.user.displayName || "User";
  const photo = req.user.photos?.[0]?.value || "https://via.placeholder.com/100";
  const email = req.user.emails?.[0]?.value || "No email found";

  res.send(`
    <html>
      <head>
        <title>Welcome</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #2b5876, #4e4376);
            color: #333;
            text-align: center;
            margin-top: 50px;
          }
          .card {
            background: white;
            display: inline-block;
            padding: 40px 60px;
            border-radius: 15px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.2);
            max-width: 400px;
          }
          img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
          }
          h1 {
            margin: 15px 0 5px;
          }
          p {
            color: #666;
            margin: 0;
          }
          a {
            display: block;
            margin-top: 20px;
            color: #0077cc;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <img src="${photo}" alt="Profile Picture" />
          <h1>Welcome, ${name}!</h1>
          <p>${email}</p>
          <hr />
          <a href="/employees">View Employees</a>
          <a href="/positions">View Positions</a>
          <a href="/api-docs">API Docs</a>
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
