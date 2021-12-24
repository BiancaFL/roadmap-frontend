import React from 'react';
import { GlobalStyle } from './styles/global';
import { useState } from 'react'
import { Menu } from './components/Menu';
import { Display } from './components/Display';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: row;
`

export function App() {
  const [screen, setScreen] = useState("DRE");

  function handleScreenChange(newScreen: string) {
    setScreen(newScreen);
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Menu selectedScreen={screen} handleScreenChange={handleScreenChange}/>
        <Display screen={screen}/>
      </Container>
    </>
  );
}

export default App;