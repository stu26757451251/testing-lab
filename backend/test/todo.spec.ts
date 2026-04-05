import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { serverOf } from '../src/server'
import * as TodoRepo from '../src/repo/todo'
import { FastifyInstance } from 'fastify'

describe('Todo API Testing', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = serverOf()
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('When receive a GET /api/v1/todos request, Then it should response an array of todos', async () => {
    // arrange: mock the repo function to return an array of todos
    const todos = [
      {
        id: '1',
        title: 'todo 1',
        description: 'description 1',
        completed: false
      },
      {
        id: '2',
        title: 'todo 2',
        description: 'description 2',
        completed: true
      }
    ]
    // Mock findAllTodos get all todos from database
    vi.spyOn(TodoRepo, 'findAllTodos').mockImplementation(async () => todos)

    // act: receive a GET /api/v1/todos request
    const response = await server.inject({
      method: 'GET',
      url: '/api/v1/todos'
    })

    // assert: response should be an array of todos
    const result = JSON.parse(response.body)['todos']
    expect(result).toStrictEqual(todos)
  })

  test('Given an empty array return from repo function, When receive a GET /api/v1/todos request, Then it should response an empty array', async () => {
    // arrange: mock the repo function to return an empty array
    vi.spyOn(TodoRepo, 'findAllTodos').mockImplementation(async () => [])

    // act: receive a GET /api/v1/todos request
    const response = await server.inject({
      method: 'GET',
      url: '/api/v1/todos'
    })

    // assert: response should be an empty array
    const todos = JSON.parse(response.body)['todos']
    expect(todos).toStrictEqual([])
  })

  test('Given a valid todo object, When receive a POST /api/v1/todos request, Then it should response the created todo object', async () => {
    // arrange: mock the repo function to return a created todo object
    const todoPayload = {
      title: 'todo 1',
      description: 'description 1',
    }
    const createdTodo = { ...todoPayload, id: '1', completed: false }
    vi.spyOn(TodoRepo, 'createTodo').mockImplementation(async () => createdTodo)

    // act: receive a POST /api/v1/todos request
    const response = await server.inject({
      method: 'POST',
      url: '/api/v1/todos',
      payload: todoPayload
    })

    // assert: response should be the created todo object
    const result = JSON.parse(response.body)['todo']
    expect(result).toStrictEqual(createdTodo)
  })

  test('Given a invalid todo object, When receive a POST /api/v1/todos request, Then it should response with status code 400', async () => {
    // arrange: mock the repo function to return an error message
    vi.spyOn(TodoRepo, 'createTodo').mockImplementation(async () => {
      throw new Error('Invalid todo object')
    })

    // act: receive a POST /api/v1/todos request

    // assert: response should with status code 400
  })
})
