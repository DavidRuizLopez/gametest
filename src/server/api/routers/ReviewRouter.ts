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

  getFromUser: publicProcedure
  .input(
    z.object({
      user: z.string()
    })
  )
  .query(({ ctx, input }) => {
    return ctx.prisma.review.findMany({
      where: { userId: input.user },
      include: {
        user: true,
        game: true
      }
    });
  }),

  get: protectedProcedure.input( z.object({ id: z.string() })).query(() => {
    return "you can now see this secret message!";
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        date:   z.date(),
        time: z.number(),
        userId: z.string(),
        gameId: z.string(),
        score: z.number().optional()
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
    }),
  update: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        time: z.number(),
        score: z.number().optional(),
        id: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      const {...data} = input
      return ctx.prisma.review.update({
        where: {id: input.id},
        data: {
          ...data
        }
      })
    })
});