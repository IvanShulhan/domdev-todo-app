import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { removeAllCompleted } from '../../features/todos/todosSlice';
import { Option } from '../../types/Option';

const StyledControlPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border: 1px solid #c2b9aa;
  background-color: #eae3d8;
  padding: 10px 15px;
  border-radius: 5px;
  @media (min-width: 605px) {
    flex-direction: row;
  }
`;

const InfoText = styled.span`
  min-width: 95px;
  min-height: 22px;
  color: #a1a1a1;
  font-weight: 500;
`;

const ClearButton = styled.button`
  cursor: pointer;
  color: #a1a1a1;
  border: none;
  outline: none;
  font-weight: 500;
  background-color: transparent;
  padding: 10px;
  transition: color 0.3s linear;
  &:hover {
    color: inherit;
  }
`

const FilterOptions = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 15px;

  @media (min-width: 605px) {
    gap: 5px;
  }
`;

const OptionButton = styled.button`
  padding: 5px 7px;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 5px;
  transition: border-color 0.3s linear;
  &:hover {
    border-color: #c2b9aa;
  }
`;

type Props = {
  completed: number;
  showOption: Option;
  changeShowOption: (option: Option) => void;
}

export const ControlPanel: React.FC<Props> = React.memo(({
  completed, showOption, changeShowOption
}) => {
  const dispatch = useAppDispatch();

  const generateBorder = (key: Option) => {
    if (key === showOption) return '#c2b9aa';
  };

  return (
    <StyledControlPanel>
      {
        <InfoText>
          {!!completed && `${completed} ${completed === 1 ? 'item' : 'items'} left`}
        </InfoText>
      }
      <FilterOptions>
        <li>
          <OptionButton
            style={{borderColor: generateBorder('all')}}
            onClick={() => changeShowOption('all')}
          >
            All
          </OptionButton>
        </li>
        <li>
          <OptionButton
            style={{borderColor: generateBorder('active')}}
            onClick={() => changeShowOption('active')}
          >
            Active
          </OptionButton>
        </li>
        <li>
          <OptionButton
            style={{borderColor: generateBorder('completed')}}
            onClick={() => changeShowOption('completed')}
          >
            Completed
          </OptionButton>
        </li>
      </FilterOptions>
      <ClearButton
        type="button"
        onClick={() => dispatch(removeAllCompleted())}
      >
        Remove completed
      </ClearButton>
    </StyledControlPanel>
  )
})
