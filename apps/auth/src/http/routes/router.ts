import { FastifyInstance } from "fastify";

import { container } from "@/container";

export async function router(app: FastifyInstance) {
  app.post("/login", async (request, response) => {
    return container.loginController.handle(request, response);
  });

  app.post("/signup", async (request, response) => {
    return container.signupController.handle(request, response);
  });
}
