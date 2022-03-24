import React, {useState} from 'react';

export default function CVUpload(){
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);

    const selectFile = (e) => {
        // setSelectedFiles(event.target.files)
    }

    const upload = () => {
        let currentFile = selectedFiles(0);

        setProgress(0);
        setCurrentFile(currentFile);

        
    }

    return(
        <form>
            <div className="custom-file mb-4">
  <input type="file" className="custom-file-input" id="customFile" />
  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
</div>
            
        </form>
    )

}