import { Hono } from "hono";
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import sqlite3 from 'better-sqlite3'

const app = new Hono()

const db = new sqlite3('../data/searches.sqlite')

app.use(cors())
app.get('/', (c) => {
  return c.text('hi')
})

app.get('/recent', (c) => {
  const bank = db.prepare(`
    SELECT * FROM search
    ORDER BY id DESC
    LIMIT 5;
  `).all()

  return c.json(bank)
})

app.post('/recent', async (c) => {
  const { username, tag } = await c.req.json()
  db.prepare(`
    INSERT INTO search
      (username, tag)
    VALUES
      ('${username}', '${tag}')  
  `).run()
  return c.json('Successfully posted i think')
})


serve({
  fetch: app.fetch,
  port: 8000
})

