import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTodo, selectTodos } from '../../features/todos/todosSlice';
import styled from 'styled-components';
import React, { useState, useMemo, useCallback } from 'react';
import { WarningMessage } from '../WarningMessage';
import { TodoItem } from '../TodoItem';
import { ControlPanel } from '../ControlPanel';
import { Option } from '../../types/Option';

const StyledTodos = styled.div`
  padding: 15px;
  background-color: #f1f1f1;
  border: 1px solid #c2b9aa;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top: none;
  position: relative;
  @media (min-width: 435px) {
    min-width: 425px;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c2b9aa;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 0 25px;
`;

const Form = styled.form`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  margin: 0 0 20px;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  color: #fff;
  font-weight: 500;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-width);
  border: none;
  background-color: #0e6fee;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: background-color 0.3s linear;

  &:hover {
    background-color: #0c65d9;
  }
`;

const MainInput = styled.input`
  height: 100%;
  width: calc(100% - var(--button-width));
  border: 1px solid #c2b9aa;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0 8px;
  border-right: none;
  outline: none;
  transition: border-color 0.3s linear;

  &::placeholder {
    color: #a1a1a1;
  }

  &:hover, &:focus {
    border-color:#898378;
  }

  @media (min-width: 435px) {
    flex-grow: 1;
    width: auto;
  }
`;

export const Todos = () => {
  const [showOption, setShowOption] = useState<Option>('all');
  const [isVisibleWarning, setIsVisibleWarning] = useState(false);
  const [todoText, setTodoText] = useState('');
  const { todos } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const completed = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos])

  const changeShowOption = useCallback((option: Option) => {
    setShowOption(option)
  }, [])

  const visibleTodos = useMemo(() => {
    switch (showOption) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return [...todos]
    }
  }, [todos, showOption])

  const showWarningMessage = () => {
    setIsVisibleWarning(true);

    setTimeout(() => {
      setIsVisibleWarning(false);
    }, 2000)
  }

  const createTodo = () => {
    if (todoText) {
      dispatch(addTodo({text: todoText}));
      setTodoText('');
    } else {
      showWarningMessage()
    }
  }

  return (
    <StyledTodos>
      <Form onSubmit={(e) => {
        e.preventDefault();
        createTodo();
      }}>
        <MainInput
          placeholder="Enter todo here"
          type="text"
          value={todoText}
          onChange={({ target }) => setTodoText(target.value)}
        />
        <SubmitButton
          type="button"
          onClick={createTodo}
        >
          Submit
        </SubmitButton>
      </Form>
      {Boolean(visibleTodos.length) && (
        <TodoList>
          {visibleTodos.map((todo) => (
            <React.Fragment key={todo.id}>
              <TodoItem todo={todo}/>
            </React.Fragment>
          ))}
        </TodoList>
      )}
      {Boolean(todos.length) && (
        <ControlPanel
          completed={completed}
          showOption={showOption}
          changeShowOption={changeShowOption}
        />
      )}
      {isVisibleWarning && <WarningMessage text="Todo must contains some text!" />}
    </StyledTodos>
  )
}
