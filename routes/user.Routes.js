import express from 'express';
import passport from '../config/passport.js';
import { checklogin, createNewAccessToken, googlecallback, userLogin, userLogout, userSignup } from '../controller/user.Controller.js';

const router = express.Router();
router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/logout',userLogout)
router.get('/check-session',checklogin)
router.post('/refresh-token',createNewAccessToken)

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googlecallback
);

export default router;