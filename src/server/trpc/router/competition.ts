import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const competitionRouter = router({
  createCompetition: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.competition.create({
          data: {
            name: input.name,
            userId: input.userId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.competition.findMany({
        select: {
          name: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
});
