import { router } from "../trpc";
import { authRouter } from "./auth";
import { competitionRouter } from "./competition";
import { competitorRouter } from "./competitor";

export const appRouter = router({
  competition: competitionRouter,
  auth: authRouter,
  competitor: competitorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
