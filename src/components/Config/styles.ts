import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: top;
  border-radius: 15px;
  margin: 0px;
  color: black;
  padding-left: 20px;

  > div > button {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  input {
    display: none;
  }

  select {
    width: 200px;
    height: 50px;
    border-radius: 15px;
    padding-left: 20px;
    color: var(--grey);
  }

  ul {
    border: 1px dashed var(--grey);
    border-radius: 8px;
  }

  li:nth-child(even) {background-color: var(--lightGrey); }
  li:last-child { border-radius: 0 0 8px 8px; }
  li:hover {
    background-color: var(--mediumGrey);
  }

  div { 
    width: 100%;
    padding: 0px;
    display: flex;
    align-items: left;
    margin: 0px;
    
    img {
      width: 200px;
      margin-bottom: 100px;
    }
  }
`
