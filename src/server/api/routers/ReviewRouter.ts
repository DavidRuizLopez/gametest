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
  getFromUser: protectedProcedure
    .input( z.object({
      userId: z.string()
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          userId: input.userId
        },
        include: {
          user: true,
          game: true
        }
      })
    })
});
