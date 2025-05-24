import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "./AppError";
import { ValidationError } from "./ValidationError";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    const validationError = new ValidationError(error);
    return reply.status(400).send(validationError.toResponse());
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send(error.toResponse());
  }

  console.error(error);

  return reply.status(500).send(new AppError("Internal server error", 500));
}
