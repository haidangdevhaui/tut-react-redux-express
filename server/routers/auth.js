import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;
    res.json({
        error: true,
        message: 'Wrong!'
    });
});

router.get('/check', (req, res) => {
    return res.json(req.user);
})

export default router;