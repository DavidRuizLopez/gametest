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
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        date:   z.date(),
        time: z.number(),
        userId: z.string(),
        gameId: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      const {userId, gameId, ...data} = input
      return ctx.prisma.review.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId
            }
          },
          game: {
            connect: {
              id: gameId
            }
          }
        }
      })
    })
});
