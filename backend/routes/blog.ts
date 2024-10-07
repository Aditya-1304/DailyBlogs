import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET : string
	},
  Variables : {
    userId : string;
  }
}>();

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.split(" ") [1]
  try{
    const user = await verify(token , c.env.JWT_SECRET)

    if  (user){
      c.set("userId",user.id as string) 
      await next()
    }else {
      c.status(403)
      return c.json({error : "aunauthorized"})
    }
  } catch (e) {
    c.status(403)
    return c.json({error : "aunauthorized"})
  }
 
})

blogRouter.post("/", async (c) => {
  
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.create({
    data : {
      title : body.title,
      content : body.content,
      authorId : Number(authorId)
    }
  })  

  return c.json({
    id : blog.id
  })
})


blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.update({
    where : {
      id : body.id
    },
    data : {
      title : body.title,
      content : body.content,
    }
  })  

  return c.json({
    id : blog.id
  })
})

//Todo : Add pagination link : https://chatgpt.com/share/6703a493-33a0-8012-9ec5-b2751df40ef2
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.blog.findMany();
  return c.json({
    blogs
  })
})  

blogRouter.get("/:id", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.blog.findFirst({
      where : {
        id : body.id
      }
    })  
  
    return c.json({
      id : blog
    })
  } catch (e) {
    c.status(411);
    return c.json({
      message : "Error while fetching blog post" 
    })
  }
}) 

