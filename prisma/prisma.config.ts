// prisma.config.ts – Prisma configuration for Neon Postgres
export default {
  datasource: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};
