import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client'; // Standard import from node_modules

const dbUrl = process.env.DATABASE_URL || '';

// Create the connection pool
const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

// Next.js development singleton pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;