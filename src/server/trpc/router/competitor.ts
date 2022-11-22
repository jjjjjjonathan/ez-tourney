import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const competitorRouter = router({
  createCompetitor: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.competitor.create({
          data: {
            name: input.name,
            userId: input.userId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  getUserCompetitors: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.competitor.findMany({
          select: {
            name: true,
          },
          where: {
            userId: input.userId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
