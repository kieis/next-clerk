import { FastifyInstance } from "fastify";
import { clerkPlugin, getAuth, clerkClient } from "@clerk/fastify";

export async function privateRoutes(app: FastifyInstance) {
  app.register(clerkPlugin);

  app.get("/private", async (req, reply) => {
    try {
      const { userId } = getAuth(req);

      if (!userId) {
        return reply.status(403).send();
      }

      const user = await clerkClient.users.getUser(userId);
      return user;
    } catch (err) {
      console.log(err);
    }
  });
}
