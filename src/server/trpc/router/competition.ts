import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';

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
  getUserCompetitions: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.competition.findMany({
          select: {
            name: true,
            id: true,
          },
          where: {
            userId: input.userId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } catch (error) {
        console.log('error', error);
      }
    }),

  getUniqueCompetition: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.competition.findUnique({
          where: {
            id: input.id,
          },
          select: {
            name: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
