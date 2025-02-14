import React from 'react'
const Uploadform = ({ onUploadComplete }) => {
    const textToDelta = (text)=> {
        const lines = text.split('\n');
        const delta = lines.map(line => ({ insert: line + '\n' }));
        return delta;
    }
    const handleFileUpload = (event) => {
        console.log('reading file')
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const delta = textToDelta(reader.result);
                onUploadComplete(delta);
            };
            reader.readAsText(file);
        }
    };
    
    return (
        <div>
            <h2>Open File</h2>
            <div className="input-card" id="openFile">
                <div className="file-drop-area">
                    <div className="fileIcon">
                        <img src="src\assets\file.svg" alt="file" />
                    </div>
                    <span className="browse-btn"
                        onClick={() => document.getElementById('fileInput').click()}>Browse File</span>
                    <input type="file" id='fileInput' accept=".txt" onChange={handleFileUpload} style={{ display: "none" }} />
                </div>
            </div>

        </div>
    );

}

export default Uploadform
