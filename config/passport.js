import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../src/db.js";
import "dotenv/config"

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
        process.env.GOOGLE_CALLBACK_URL,
        },
        async( accessToken, refreshToken , profile , done)=>{
            try {
              let user = await prisma.user.findUnique({
          where: {
            email: profile.emails?.[0].value,
          },
        });

        if(user){
          user = await prisma.user.update({
          where:{
            email :profile.emails?.[0].value,
          },
          data:{
            provider:"GOOGLE",
            providerId:profile.id,
          }
        })
        return done(null, user)
        }

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails?.[0].value,
              provider: "GOOGLE",
              providerId: profile.id,
              username: profile.emails?.[0].value.split("@")[0],
            },
          });
        }

        done(null, user);  
            } catch (error) {
               done(null, error) 
            }
        }
    )
)

export default passport;