import React, { useEffect, useState, useRef } from 'react';
import Room from './components/Room';
import Editor from './components/Editor';
import Loginform from './components/Loginform';
import Uploadform from './components/Uploadform';


const App = () => {
    const check = async () => {
        console.log('checking')
        const response = await fetch(`http://localhost:8000/api/auth/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token') })
        })
        const { islogined } = await response.json()
        if (islogined) {
            setCurrentStep("roomSelector");
        }
    };
    const [documentContent, setDocumentContent] = useState("");
    const [currentStep, setCurrentStep] = useState("login");
    const [roomId, setRoomId] = useState("");
    useEffect(() => {
        (async () => await check())();
        console.log('useEffect')
    }, [])
    useEffect(()=>{
        if(documentContent){
            setCurrentStep("editor");
        }
    },[documentContent])

    const handleLogin = () => {
        console.log('logined')
        setCurrentStep("roomSelector");
    };

    const handleRoomSelect = async (room, isNew) => {
        setRoomId(room);
        if (isNew) {
            console.log('creating room',room)
            setCurrentStep("documentUploader");
            await fetch(`http://localhost:8000/api/documents/create/${room}`)
            console.log(roomId)
        }
        else {
            const response = await fetch(`http://localhost:8000/api/documents/roomId/${room}`)
            const {delta} = await response.json();
            console.log(delta)
            setDocumentContent(delta);
        }
    };

    const handleUploadComplete = async (delta) => {
        console.log('uploading')
        setDocumentContent(delta);
        await fetch(`http://localhost:8000/api/documents/roomId/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ roomId, delta })
        })
    };

    return (
        <div>
            {currentStep === "login" && <Loginform onLogin={handleLogin} />}
            {currentStep === "roomSelector" && <Room onRoomSelect={handleRoomSelect} />}
            {currentStep === "documentUploader" && <Uploadform onUploadComplete={handleUploadComplete} />}
            {currentStep === "editor" && <Editor roomId={roomId} content={documentContent} />}
        </div>
    );

};

export default App;
