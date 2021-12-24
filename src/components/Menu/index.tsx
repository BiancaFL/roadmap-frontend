import { Button } from '../Button'
import { Container } from './styles'
import gear from '../../assets/cog-outline.png'
import file from '../../assets/text-box-outline.png'
import { useEffect } from 'react';

type MenuProps = {
    handleScreenChange: Function;
    selectedScreen: string;
}

export function Menu(props: MenuProps) {
    const {handleScreenChange, selectedScreen} = props;

    useEffect(() => {
    }, [selectedScreen]);

    return (
        <Container>
            <Button 
                selected={(selectedScreen === "DRE")} 
                onClick={()=>{handleScreenChange("DRE")}}
                className={selectedScreen === "DRE" ? "selected": "not-selected"}
            >
                <img src={file} alt="delete icon"/>
                Gerar DRE
            </Button>
            <Button 
                selected={(selectedScreen === "Config")} 
                onClick={()=>{handleScreenChange("Config")}}
                className={selectedScreen === "Config" ? "selected": "not-selected"}
            >
                <img src={gear} alt="delete icon"/>
                Parametrizar importação
            </Button>
        </Container>
    )
}
 