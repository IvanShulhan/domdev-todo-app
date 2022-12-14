import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{text: string}>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
      })
    },
    removeTodo: (state, action: PayloadAction<{id: string}>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    editTodo: (state, action: PayloadAction<{id: string, text: string}>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);

      if (todo) {
        todo.text = action.payload.text;
      }
    },
    toggleCompleted: (state, action: PayloadAction<{id: string}>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeAllCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    }
  }
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  toggleCompleted,
  removeAllCompleted
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;
