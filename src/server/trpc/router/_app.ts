import { router } from "../trpc";
import { authRouter } from "./auth";
import { competitionRouter } from "./competition";

export const appRouter = router({
  competition: competitionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
