import { Container} from './styles';
import { DownloadButton } from '../DownloadButton';
import { DeleteButton } from '../DeleteButton';
import { MouseEventHandler } from 'react';

type ConfigItemProps = {
    type: string;
    handleDelete: MouseEventHandler<HTMLButtonElement>;
    handleDownload: MouseEventHandler<HTMLButtonElement>;
}

export function ConfigItem(props: ConfigItemProps) {
    const { type, handleDelete, handleDownload } = props;

    return (
        <Container>
            <div>{type}</div>
            <DownloadButton onClick={handleDownload}/>
            <DeleteButton onClick={handleDelete}/>
        </Container>
    )
}
 


