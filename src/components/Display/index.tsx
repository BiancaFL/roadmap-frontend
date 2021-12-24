import { Container } from './styles'
import { Config } from '../Config';
import { GenerateDRE } from '../GenerateDRE';

type DisplayProps = {
  screen: string;
};


export function Display(props: DisplayProps) {
    const screen = props.screen;

    return (
      <Container>
          { screen === "Config" ? <Config /> : <GenerateDRE />}
      </Container>
    
  )
}