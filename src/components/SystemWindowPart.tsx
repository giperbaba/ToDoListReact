import Clock from './Clock';

interface SystemWindowProps {
    uploadTasksJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
    downloadTasksJSON: () => void;
}

export default function SystemWindowPart( {uploadTasksJSON, downloadTasksJSON} : SystemWindowProps) {
    
    return(
        <div className='system'>
            <div className="clock">
                <Clock/>
            </div>
            <label className="button" htmlFor="file-input">Загрузить список дел</label>
            <input
                id="file-input"
                type="file"
                accept="application/json"
                onChange={uploadTasksJSON}
            />
            <button className="button" onClick={downloadTasksJSON}>Сохранить список дел</button>
        </div>
    )
}