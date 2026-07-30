import express from 'express';
import bodyParser from 'body-parser';
import dramaRoutes from './routes/dramas.js';
import cors from 'cors';

const app = express();
const PORT = 5000

app.use(cors());
app.use(bodyParser.json());
app.use('/api/dramalist', dramaRoutes);

app.get('/', (req, res) => {
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));