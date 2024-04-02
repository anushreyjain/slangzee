import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import User from "@/app/(models)/User";

const afterCallback = async (req, session, state) => {
  const user = session.user;
  let userFound = await User.findOne({
    email: user.email,
  });
  const userObj = {
    email: user.email,
    picture: user.picture,
    given_name: user.given_name,
    family_name: user.family_name,
    email_verified: user.email_verified,
  };
  if (!userFound) {
    userFound = await User.create(userObj);
  } else {
    await User.updateOne({ email: user.email }, userObj);
  }
  session.user.role = userFound.role;
  session.user._id = userFound._id;
  return session;
};

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback,
    redirectUri: "http://localhost:3000",
  }),
});
