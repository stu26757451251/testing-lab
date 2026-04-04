import mongoose from 'mongoose'

import { Todo } from '../types/todo'

const todoSchema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    completed: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)

todoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false
})

export default mongoose.models.Todo || mongoose.model<Todo>('Todo', todoSchema)
