import { Button } from '../Button';
import { Container } from './styles';
import { useState, useEffect, ChangeEvent } from 'react';
import logo from '../../assets/roadmap.jpeg';
import { convertBase64 } from '../shared';
import axios from 'axios';
import save from 'save-file';

type Config = {
    type: string;
    map: { [key: string]: string };
}

export function GenerateDRE() {
    const initialConfigs: Config[] = [];
    const [configs, setConfigs] = useState(initialConfigs);
    const [configType, setConfigType] = useState("");

    useEffect(() => {
        const loadedConfigs = localStorage.getItem("configs");
        if (loadedConfigs) {
            setConfigs(JSON.parse(loadedConfigs));
        }
    },[])

    async function handleUpload(){
        const tempLink = document.getElementById("fileInput");
        tempLink?.click();
        
    }

    function handleChange(event: ChangeEvent<HTMLSelectElement>){
        if (event.target.value) setConfigType(event.target.value);
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const tempFiles: FileList = {} as FileList;
        if (!event?.target?.files) return;

        const files = event?.target?.files ? event?.target?.files : tempFiles;
        const file = files[0];
        
        const configs = localStorage.getItem("configs") || "[]";
        const parsedConfigs = JSON.parse(configs);
        const config = parsedConfigs.find((c: Config)  => { return c.type === configType });

        const base64 = await convertBase64(file);

        try {
            const response = await axios(
                {
                    method: 'post',
                    url: '/dre',
                    data: {
                        config: config,
                        rawBuffer: base64
                    }
                }
            );

            save(response, `DRE.xlsx`);
        } catch (error) {
            console.log(error);
        }

        event.target.value = "";
    }

    return (
        <Container>
            <div id="logo"><img src= {logo} alt="roadmap logo"/></div>
            <div>
                <p>Modelo:</p>
            </div>
            <input id="fileInput" type="file" onChange={handleFileChange} multiple/>
            <select onChange={handleChange} defaultValue="">
                <option value="" disabled>Escolha um modelo de DE/PARA</option>
                {                    
                    configs.map(config => {
                        return (<option key={config.type}>{config.type}</option>)
 })
                }
            </select>
            <Button onClick={async () => {await handleUpload()}}>Gerar DRE</ Button>
        </Container>
    )
}
 


