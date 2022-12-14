import styled from 'styled-components';
import { Content } from './components/Content';

const StyledApp = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  overflow-x: hidden;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  background-color: #eee;
`;

function App() {
  return (
    <StyledApp>
      <Content />
    </StyledApp>
  );
}

export default App;
