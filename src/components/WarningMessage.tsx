import styled from 'styled-components';

const StyledWarningMessage = styled.span`
  font-size: 24px;
  font-weight: 500;
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #eae3d8;
  color: #f1361d;
  border-radius: 10px;
  padding: 15px;
`;

type Props = {
  text: string;
}

export const WarningMessage: React.FC<Props> = ({ text }) => (
  <StyledWarningMessage>{text}</StyledWarningMessage>
);
