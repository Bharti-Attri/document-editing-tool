import { enable, disable } from "../js/validation";
import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";


function Room({ onRoomSelect }) {
    const [roomId, setRoomId] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const joinRef = useRef(null);
    console.log('select room')
    
    const handleCreateRoom = (e) => {
        e.preventDefault();
        console.log('create button')
        const generatedRoomId = nanoid(10);
        onRoomSelect(generatedRoomId, true);
    };

    const handleChange = (e) => {
        console.log('changing value of roomid input')
        setRoomId(e.target.value);
        setIsDisabled(e.target.value.length !== 10);
        if (e.target.value.length === 10)
            enable(joinRef.current);
        else
            disable(joinRef.current);
    };

    const handleJoinRoom = () => {
        console.log('join room button');
        onRoomSelect(roomId, false);
    };

    return (
        <div className="container">
            <div className="form-box">
                <form id="roomSelector">
                    <h2>Join Room</h2>
                    <input
                        type="text"
                        placeholder="Enter 10 Digits RoomId"
                        value={roomId}
                        onChange={handleChange}
                    />
                    <button
                        className="join primary-btn"
                        type="button"
                        onClick={handleJoinRoom}
                        ref={joinRef}
                        disabled={isDisabled}
                    >
                        Join Room
                    </button>
                    <div className="seperator">
                        <div></div>
                        <span>OR</span>
                        <div></div>
                    </div>
                    <button
                        className="create primary-btn"
                        type="button"
                        onClick={handleCreateRoom}
                    >
                        Create Room
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Room;
