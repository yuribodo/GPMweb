import express from 'express';

import cors from 'cors'
const app = express()

const port = process.env.PORT || 8080;
import discentesRoutes from './routes/discentes.routes';
import doscentesRoutes from './routes/doscentes.routes';
import projetoRoutes from './routes/projetos.routes';
import noticiaRoutes from './routes/noticias.controllers';

app.use(cors());

app.use(express.json())

app.use('/discentes', discentesRoutes);
app.use('/doscentes', doscentesRoutes);
app.use('/projetos', projetoRoutes);
app.use('/noticias', noticiaRoutes);

app.get('/ping', (req, res) => {
    res.json({message: "pong"}).status(200)
})

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`)
})