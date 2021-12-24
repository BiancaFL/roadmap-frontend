import styled from 'styled-components'

export const Container = styled.button`
  height: 42px;
  padding: 0 10px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--secondary);
  border-radius: 8px;
  border: 0;

  color: #FFF;
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif !important;

  cursor: pointer;
 
  &.selected {
    background-color: var(--pdark);
  }

  &.not-selected {
    background-color: var(--primary);
  }

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }

  img {
    margin-right: 10px;
  }
  
`
