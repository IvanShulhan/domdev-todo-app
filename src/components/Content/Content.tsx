import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { selectTodos } from '../../features/todos/todosSlice';
import { Todos } from '../Todos';

const StyledContent = styled.section`
  max-width: 768px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #eae3d8;
  border: 1px solid #c2b9aa;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #373333;
`;

export const Content = () => {
  const { todos } = useAppSelector(selectTodos);

  return (
    <StyledContent>
      <Header>
        <Title>Todos {!!todos.length && `(${todos.length})`}</Title>
      </Header>
      <Todos />
    </StyledContent>
  )
}
