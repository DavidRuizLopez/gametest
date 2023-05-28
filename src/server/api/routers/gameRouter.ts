import { createTRPCRouter, protectedProcedure } from "../trpc"

export const gameRouter = createTRPCRouter({
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.game.findMany()
        })
})