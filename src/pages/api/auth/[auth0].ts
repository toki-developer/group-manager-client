/* eslint-disable import/no-default-export */
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const afterCallback = (req: any, res: any, session: any, state: any) => {
  return {
    ...session,
    user: {
      sub: session.user.sub,
    },
  };
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
