export type Todo = {
  id: string
  title: string
  description?: string
  completed: boolean
}

export type TodoBody = Omit<Todo, 'id'>
