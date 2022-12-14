import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import bucket from '../assets/images/bucket.svg';
import edit from '../assets/images/edit.svg';

type Props = {
  color: 'red' | 'green';
  callback?: () => void;
}

const StyledButton = styled.button`
  cursor: pointer;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: ${props => props.theme.bg};
`

const Icon = styled.span`
  width: 15px;
  height: 15px;
  background-size: contain;
  background-position: center;
  background-image: url(${props => props.theme.url});
`

const theme = {
  bg: '',
  url: ''
};

export const Button: React.FC<Props> = React.memo(({
  color, callback
}) => {
  const setColor = () => {
    switch(color) {
      case 'red':
        return '#f1361d';
      default:
        return '#178517';
    }
  }

  const setIcon = () => {
    switch(color) {
      case 'red':
        return bucket;
      default:
        return edit;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        type="button"
        theme={{ bg: setColor() }}
        onClick={callback}
      >
        <Icon theme={{ url: setIcon() }}/>
      </StyledButton>
    </ThemeProvider>
)})
