import { FastifyInstance, RouteShorthandOptions } from 'fastify'

import { addTodo, deleteTodo, getTodos, updateTodoCompleted, editTodoDetails } from '../services/todo'
import { TodoBody } from '../types/todo'

export const TodoRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  interface IdParam {
    id: string
  }
  interface CompletedBody {
    completed: boolean
  }
  interface EditBody {
    title: string
    description: string
  }

  server.get('/v1/todos', async (request, reply) => {
    try {
      const todos = await getTodos()
      return reply.status(200).send({ todos })
    } catch (error) {
      server.log.error(`GET /v1/todos Error: ${error}`)
      return reply.status(500).send(`Internal Server Error`)
    }
  })

  server.post<{ Body: TodoBody }>('/v1/todos', async (request, reply) => {
    try {
      const todoBody = request.body
      const todo = await addTodo(todoBody)
      return reply.status(201).send({ todo })
    } catch (error) {
      server.log.error(`POST /v1/todos Error: ${error}`)
      if (error instanceof Error && error.message === 'Invalid todo object') {
        return reply.status(400).send(`Invalid todo object`)
      }
      return reply.status(500).send(`Internal Server Error`)
    }
  })

  server.put<{ Params: IdParam; Body: CompletedBody }>('/v1/todos/:id/completed', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const completed = request.body.completed
      const todo = await updateTodoCompleted(id, completed)
      if (todo) {
        return reply.status(200).send({ todo })
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      server.log.error(`PUT /v1/todos/${request.params.id}/completed Error: ${error}`)
      return reply.status(500).send(`Internal Server Error`)
    }
  })

  server.patch<{ Params: IdParam; Body: EditBody }>('/v1/todos/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const { title, description } = request.body
      const todo = await editTodoDetails(id, title, description)
      if (todo) {
        return reply.status(200).send({ todo })
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      server.log.error(`PATCH /v1/todos/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`Internal Server Error`)
    }
  })

  server.delete<{ Params: IdParam }>('/v1/todos/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const todo = await deleteTodo(id)
      if (todo) {
        return reply.status(204).send()
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      server.log.error(`DELETE /v1/todos/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`Internal Server Error`)
    }
  })


  done()
}
