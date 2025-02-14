import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    content: { type: Object, default: {} },
}, { timestamps: true });
      

export default mongoose.model('Document', DocumentSchema);
