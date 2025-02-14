import express from 'express';
import Document from '../models/Document.js';
const router = express.Router();
router.get('/',)

router.get('/roomId/:roomId', async (req, res) => {
    try {
        const document = await Document.findOne({ roomId: req.params.roomId });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json({delta: document.content});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/create/:roomId', async(req, res)=>{
        const room = new Document({roomId: req.params.roomId});
        await room.save();
        res.status(200)
})

router.post('/roomId/:roomId', async (req, res) => {
    console.log(req.params.roomId)
    const { delta } = req.body;
    const document = await Document.findOne({ roomId: req.params.roomId });
    document.content = delta;
    await document.save();
    res.status(200)
});

export default router;
