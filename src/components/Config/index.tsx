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

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function Config() {
    const tempConfigs: ConfigType[] = [];
    let tempFiles: FileList | null = {} as FileList;
    const [configs, setConfigs] = useState(tempConfigs);
    const [selectedFiles, setSelectedFiles] = useState(tempFiles);

    useEffect(() => {
        try {
            (async () => {
                const response = await axios(
                    {
                        method: 'get',
                        url: '/configs',
                        withCredentials: true,
                    }
                );

                const loadedConfigs = response?.data;

                if (loadedConfigs) {
                    setConfigs(loadedConfigs);
                }
            })();
        } catch (error) {
            console.log(error);
        }
    },[])

    async function handleDelete (item: string) {
        try {
            const response = await axios(
                {
                    method: 'delete',
                    url: '/config',
                    withCredentials: true,
                    data: {
                        configType: item,
                    }
                }
            );

            setConfigs(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDownload (type: string) {
      
        try {
            const response = await axios(
                {
                    method: 'post',
                    url: '/config/download',
                    data: { configType : type },
                    withCredentials: true,
                }
            );

            save(response, `${type}.xlsx`);

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
 
        let type = files[0].name;
        type = type.split(".")[0];


        const base64 = await convertBase64(file);

        try {
            const response = await axios(
                {
                    method: 'post',
                    url: '/config/upload',
                    withCredentials: true,
                    data: {
                        type: type,
                        file: base64
                    }
                }
            );
            
            setConfigs(response.data);
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
 


