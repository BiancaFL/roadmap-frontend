import { Button } from '../Button';
import { Container} from './styles';
import { ConfigItem } from '../ConfigItem';
import { useState, useEffect, ChangeEvent } from 'react';
import logo from '../../assets/roadmap.jpeg';
import { convertBase64 } from '../shared';
import axios from 'axios';
import save from 'save-file';

type ConfigType = {
    type: string;
    map: { [key: string]: string };
}

axios.defaults.baseURL = 'http://localhost:3333';

export function Config() {
    const tempConfigs: ConfigType[] = [];
    let tempFiles: FileList | null = {} as FileList;
    const [configs, setConfigs] = useState(tempConfigs);
    const [selectedFiles, setSelectedFiles] = useState(tempFiles);

        const a = selectedFiles[0] instanceof Blob;

    useEffect(() => {
        const loadedConfigs = localStorage.getItem("configs");
        if (loadedConfigs) {
            setConfigs(JSON.parse(loadedConfigs));
        }
    },[])

    function handleDelete (item: string) {
        const newState = configs.filter(el => {return (el.type !== item)});
        setConfigs(newState);
        localStorage.removeItem("configs");
        localStorage.setItem("configs", JSON.stringify(newState)); 
    }

    async function handleDownload (type: string) {
        const configsStorage: string = localStorage.getItem("configs") || "[]";
        const configs = JSON.parse(configsStorage) as ConfigType[];
        const config = configs.find(c => {return c.type === type})

        console.log(config);

        try {
            const response = await axios(
                {
                    method: 'post',
                    url: '/config/download',
                    data: { config : config },
                }
            );

            save(response, `file.xlsx`);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const tempFiles: FileList = {} as FileList;
        if (!event?.target?.files) return;

        const files = event?.target?.files ? event?.target?.files : tempFiles;
        const file = files[0];

        setSelectedFiles(files);
 
        const type = files[0].name;

        const base64 = await convertBase64(file);

        try {
            const response = await axios(
                {
                    method: 'post',
                    url: '/config/upload',
                    data: {
                        type: type,
                        file: base64
                    }
                }
            );
            
            let configsStorage: string = localStorage.getItem("configs") || "[]";
            const loadedConfigs = JSON.parse(configsStorage);
            loadedConfigs.push(response.data);
            localStorage.removeItem("configs");
            localStorage.setItem("configs", JSON.stringify(loadedConfigs));
            setConfigs(loadedConfigs);
        } catch (error) {
            console.log(error);
        }

        event.target.value = "";
    }

    async function handleUpload(){
        const tempLink = document.getElementById("fileInput");
        tempLink?.click();
    }

    return (
        <Container>
            <div><img src= {logo} alt="roadmap logo"/></div>
            <div><Button onClick={async () => {await handleUpload()}}>Adicionar</Button></div>
            <input id="fileInput" type="file" onChange={handleFileChange} multiple/>
            <ul>
                {configs.map(el => {
                    return (
                        <ConfigItem 
                            key={el.type} 
                            type={el.type} 
                            handleDelete={async () => {await handleDelete(el.type)}} 
                            handleDownload={async () => {await handleDownload(el.type)}}
                        />)
                })}
            </ul>
        </Container>
    )
}
 


