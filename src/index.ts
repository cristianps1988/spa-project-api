import express from "express";

const app = express();
const port = 8888;

app.use(express.json())

app.get("/", (_req, res) => {
    console.log('Holissssss')
    res.send('Respuesta')
})

app.listen(port, () => {
    console.log(`Servidor en el puertos ${port}`)
})