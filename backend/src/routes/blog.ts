import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { sign, verify } from "hono/jwt"
import { createPostInput,updatePostInput } from "@chuffiii/medium-common"

export const blogRouter = new Hono<{
    Bindings: {
		HYPERDRIVE: {
            connectionString: string;
        };
        JWT_SECRET: string;
    };
    Variables:{
        userId : string,
    }
}>();

blogRouter.use('/*',async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET,'HS256');
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId',String(payload.id));
	await next()
});

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const adapter = new PrismaPg({
    connectionString: c.env.HYPERDRIVE.connectionString,
});

const prisma = new PrismaClient({ adapter });

	const body = await c.req.json();
	const parsedBody = createPostInput.safeParse(body);
	if(!parsedBody.success){
		c.status(411);
		return c.json({ error:"invalid input"})
	}
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const adapter = new PrismaPg({
    connectionString: c.env.HYPERDRIVE.connectionString,
});

const prisma = new PrismaClient({ adapter });

	const body = await c.req.json();
	const parsedBody = updatePostInput.safeParse(body);
	if(!parsedBody.success){
		c.status(411);
		return c.json({error:"invalid error"})
	}
	
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/bulk', async (c) => {
	const adapter = new PrismaPg({
    connectionString: c.env.HYPERDRIVE.connectionString,
});

const prisma = new PrismaClient({ adapter });
	
	const posts = await prisma.post.findMany({
		select:{
			title:true,
			content:true,
			id:true,
			createdAt:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json(posts);
})


blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const adapter = new PrismaPg({
    connectionString: c.env.HYPERDRIVE.connectionString,
});

const prisma = new PrismaClient({ adapter });
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
		select :{
			id : true,
			title : true,
			content : true,
			createdAt: true,
			author : {
				select : {
					name : true
				}
			}
		}
	});

	return c.json(post);
})



