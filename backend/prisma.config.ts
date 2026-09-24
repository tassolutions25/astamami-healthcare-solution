import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://openpg:openpgpwd@localhost:5432/astamami_db',
  },
});
