import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { removeTodo, editTodo, toggleCompleted } from '../../features/todos/todosSlice';
import { Todo } from '../../types/Todo';
import { Button } from '../Button';
import check from '../../assets/images/check.svg';

type Props = {
  todo: Todo;
};

const StyledTodoItem = styled.li`
  font-size: 18px;
  height: 55px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #c2b9aa;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 0 0 15px;
`;

const ToggleCompleted = styled.span`
  min-width: 15px;
  width: 15px;
  height: 15px;
  border: 1px solid #c2b9aa;
  border-radius: 2px;
  outline: none;
  margin: 0 15px 0 0;
  background-color: transparent;
  background-size: contain;
  background-image: url(${props => props.theme.checked && check});
`;

const TodoText = styled.span`
  flex-grow: 1;
  font-size: 18px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 20px;
  font-size: 18px;
  color: inherit;
`;

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const remove = useCallback(() => {
    dispatch(removeTodo({id: todo.id}))
  }, [dispatch, todo.id])

  const changeTodoText = useCallback(() => {
    if (value) {
      dispatch(editTodo({ id: todo.id, text: value }))
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  }, [dispatch, todo.id, value])

  const changeIsEdit = useCallback(() =>{
    setIsEditing(true);
    setValue(todo.text);
  }, [todo.text])

  const theme = {
    checked: false,
  };

  return (
    <StyledTodoItem
      onDoubleClick={changeIsEdit}
    >
      <ThemeProvider theme={theme}>
        <ToggleCompleted
          theme={{ checked: todo.completed }}
          onClick={() => dispatch(toggleCompleted({id: todo.id}))}
        />
        {!isEditing ? (
          <TodoText
            onClick={() => dispatch(toggleCompleted({id: todo.id}))}
          >
            {todo.text}
          </TodoText>
        ) : (
          <Input
            autoFocus
            value={value}
            onChange={({ target }) => setValue(target.value)}
            onBlur={changeTodoText}
            onKeyDown={({ code }) => {
              if (code === 'Enter') {
                changeTodoText()
              }

              if (code === 'Escape') {
                setIsEditing(false);
              }
            }}
          />
        )}
        <Buttons>
          <Button
            color="green"
            callback={changeIsEdit}
          />
          <Button
            color="red"
            callback={remove}
          />
        </Buttons>
      </ThemeProvider>

    </StyledTodoItem>
  )
})
