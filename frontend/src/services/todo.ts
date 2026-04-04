import axios from 'axios'
import { Todo } from '../types/todo'

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const res = await axios.get(`/api/v1/todos`)
    return res.data.todos
  } catch (error) {
    console.error(`GET /todos ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export const addTodo = async (title: string, description?: string): Promise<Todo> => {
  try {
    const newTodo = {
      title,
      description
    }
    const res = await axios.post(`/api/v1/todos`, newTodo)
    return res.data.todo
  } catch (error) {
    console.error(`POST /api/v1/todos ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export const toggleTodoStatus = async (id: string, completed: boolean): Promise<Todo> => {
  try {
    const payload = {
      completed
    }
    const res = await axios.put(`/api/v1/todos/${id}/completed`, payload)
    return res.data.todo
  } catch (error) {
    console.error(`PUT /api/v1/todos/${id}/completed ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export const editTodo = async (id: string, title: string, description: string): Promise<Todo> => {
  try {
    const payload = { title, description }
    const res = await axios.patch(`/api/v1/todos/${id}`, payload)
    return res.data.todo
  } catch (error) {
    console.error(`PATCH /api/v1/todos/${id} ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/v1/todos/${id}`)
    return
  } catch (error) {
    console.error(`DELETE /api/v1/todos/${id} ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}
