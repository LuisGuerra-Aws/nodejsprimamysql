const express = require('express');

import { prismaClient } from './Repository/database';
import { allRoutes } from './Routers/all.routes';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500')

const app = express();
app.use(express.json);

app.get('/', (_req, resultado) => {
    return resultado.json({ message: 'Hola mundo estamos en NodeJs'});
});

app.use('/', allRoutes());

app.listen(PORT, async() => {
    await prismaClient.$connect();

    console.log(`App iniciada en url ${HOST}:${PORT}`)
});