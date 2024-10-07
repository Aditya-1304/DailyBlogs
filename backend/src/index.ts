import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { sign, verify } from 'hono/jwt';
import { blogRouter } from '../routes/blog';
import { userRouter } from '../routes/user';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET : string
	}
}>();

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)

export default app
