import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
              created_at: search,
              completed_at: search,
            }
          : null
      )
      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Título e descrição são obrigatórios" }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert("tasks", task)

      return res.writeHead(201).end(JSON.stringify(task))
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Title and description are required." }))
      }

      const updated = database.update("tasks", id, {
        title,
        description,
        updated_at: new Date(),
      })

      if (!updated) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not found." }))
      }

      return res.writeHead(204).end()
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      const deleted = database.delete("tasks", id)

      if (!deleted) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not found." }))
      }

      return res.writeHead(204).end()
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      const updated = database.update("tasks", id, {
        completed_at: new Date(),
      })

      if (!updated) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not found." }))
      }

      return res.writeHead(204).end()
    },
  },
]
