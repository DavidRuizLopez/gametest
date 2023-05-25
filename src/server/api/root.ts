import { createTRPCRouter } from "gametest/server/api/trpc";
import { exampleRouter } from "gametest/server/api/routers/example";
import { reviewRouter } from "./routers/ReviewRouter";
import { userRouter } from "./routers/UserRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  review: reviewRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
