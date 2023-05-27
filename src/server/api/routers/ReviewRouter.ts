import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "gametest/server/api/trpc";

export const reviewRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      include: {
        user: true,
        game: true
      }
    });
  }),

  get: protectedProcedure.input( z.object({ id: z.string() })).query(() => {
    return "you can now see this secret message!";
  }),
});
