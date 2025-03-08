import { useEffect, useRef, useState, useContext } from "react";
import "quill/dist/quill.snow.css";
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
Quill.register("modules/cursors", QuillCursors);
import { io } from "socket.io-client";
import Loader from "./Loader";
import { StepContext } from "../context.js";
const Editor = ({ roomId, content }) => {
  const socket = useRef(null);
  const quillRef = useRef(null);
  const cardRef = useRef(null);
  const downloadCardRef = useRef(null);
  const copyRef = useRef(null);
  const cursorsModuleRef = useRef(null);
  const [status, setStatus] = useState("Processing");
  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    console.log(socket.current)
    if (!quillRef.current) {
      const editorContainer = document.getElementById("editor");

      quillRef.current = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: false,
          cursors: true,
        },
      });

      cursorsModuleRef.current = quillRef.current.getModule("cursors");
    }

    const quill = quillRef.current;
    const cursors = cursorsModuleRef.current;

    if (content) {
      quill.setContents(content);
    }
    socket.current.emit("join-room", { roomId, token: localStorage.getItem("token") });;

    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        const content = quill.getContents();
        socket.current.emit("send-changes", roomId, delta, content);
      }
    });
    quill.on("selection-change", (range) => {
      if (range && range.index !== undefined) {
        socket.current.emit("send-cursor", {
          roomId,
          token: localStorage.getItem('token'),
          range,
        });
      }
    });
    socket.current.on("receive-changes", (delta) => {
      console.log(delta)
      quill.updateContents(delta);
    });
    socket.current.on("receive-cursor", ({ username, range }) => {
      console.log(username, range, "recieving cursor")
      if (cursors) {
        cursors.createCursor(username, username, "blue");
        cursors.moveCursor(username, range);
      }
    });

    return () => {
      socket.current.off("receive-cursor");
      socket.current.off("receive-changes");
      socket.current.disconnect();
    };
  }, [content, roomId]);
  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId)
    copyRef.current.style.backgroundColor = '#101010a2';
    copyRef.current.textContent = 'Copied';
  }
  const exportDeltaToTextFile = (delta) => {
    console.log(delta);
    const plainText = delta.ops
      .map(op => (typeof op.insert === "string" ? op.insert : ""))
      .join("");
    const blob = new Blob([plainText], { type: "text/plain" });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "content.txt";
    downloadLink.textContent = "Download File";
    downloadLink.className = "download-btn";
    downloadCardRef.current.appendChild(downloadLink);
    setStatus("Ready to Download");
  };
  const handleDownload = () => {
    downloadCardRef.current.style.display = "flex";
    const delta = quillRef.current.getContents();
    console.log(delta);
    exportDeltaToTextFile(delta);
  }
  const handleClose = () => {
    cardRef.current.style.display = 'none';
    copyRef.current.style.backgroundColor = '#107265';
    copyRef.current.textContent = 'Copy to Clipboard';
  }
  const hideDownloadCard = () => {
    downloadCardRef.current.style.display = "none";
    const downloadLink = document.querySelector(".download-btn");
    console.log(downloadLink)
    if (downloadLink) {
      downloadCardRef.current.removeChild(downloadLink)
      setStatus("processing");
    }
  }
  const stepContext = useContext(StepContext);
  const leaveRoom = ()=>{
    stepContext.setCurrentStep('roomSelector')
  }

  return <>
    <div id="editor" />
    <div className="popup-card form-box" style={{display:"none"}} ref={cardRef}>
      <button type="button" className="close-btn" onClick={handleClose}><img src="src\assets\close.svg" alt="close" /></button>
      <h3>Share Room Id to Your Team</h3>
      <div className="room-id" id="roomId">{roomId}</div>
      <button className="copy-btn" ref={copyRef} onClick={copyRoomId}>Copy to Clipboard</button>
    </div>
    <div className="download-card" ref={downloadCardRef} style={{display:"none"}}>
      <button type="button" className="close-btn" onClick={hideDownloadCard}><img src="src\assets\close.svg" alt="close" /></button>
      <h2>Download</h2>
      <div className="status">
        {(status === "Processing") ? <Loader /> : <img src="src\assets\done.svg" alt="done" />}
        <div>{status}</div>
      </div>
    </div>
    <button type="button" className="leave-btn" onClick={leaveRoom}>Leave</button>
    <button type="button" className="show-card"
      onClick={() => { cardRef.current.style.display = 'flex'; }}
      title="Collab">
      <img src="src\assets\addmember.svg" alt="Collab" />
    </button>
    <button type="button" className="show-download-card"
      onClick={handleDownload}>
      <img src="src\assets\download.svg" alt="Download" />
    </button>
  </>;
};

export default Editor;
