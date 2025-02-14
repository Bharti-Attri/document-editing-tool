import Document from '../models/Document.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'

const getUsername = async(token)=>{
    const userid = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userid.id);
    return user.username;
}
const saveDocument = async(roomId,content)=>{
    const document = await Document.findOneAndUpdate(
        { roomId },
        { content },
      );
    await document.save()
}


export {getUsername, saveDocument}