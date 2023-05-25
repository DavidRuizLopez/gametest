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
});
