import styled from 'styled-components'

export const Container = styled.button`
  height: 30px;
  width: 30px;
  padding: 0px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--sdark);
  border-radius: 5px;
  border: 0;

  color: #FFF;
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  img {
    height: 20px;
  }

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }
`
