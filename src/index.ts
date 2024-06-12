import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.routes";
import categoryRouter from "./routes/categories.routes";
import genderRouter from "./routes/gender.routes";

const app = express();
const port = 8888;

app.use(cors())
app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/gender", genderRouter)

app.listen(port, () => {
    console.log(`Servidor en el puertos ${port}`)
})