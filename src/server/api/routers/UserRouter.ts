import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "gametest/server/api/trpc";

export const userRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  get: protectedProcedure.input( z.object({ id: z.string() })).query(({ ctx, input}) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        id: input.id
      }
    })
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          description: input.description
        }
      })
    })
});
