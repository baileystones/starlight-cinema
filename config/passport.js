import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        emails: profile.emails,
        photos: profile.photos
      };
      return done(null, user);
    }
  )
);

// Serialize user info for session handling
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user info for session handling
passport.deserializeUser((user, done) => {
  done(null, user);
});


export default passport;
