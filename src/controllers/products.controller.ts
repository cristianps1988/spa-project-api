import { PrismaClient } from "@prisma/client";
import json from '../helpers/jsonBigInt';
import { ProductFull } from "../types";

const prisma = new PrismaClient()

const getProducts = async (_req: any, res: any): Promise<ProductFull | void> => {
    try {
        const products = await prisma.products.findMany()
        if (!products) {
            return res.status(404).json({
                msg: "No hay productos guardados"
            })
        }
        res.send(json(products))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al obtener los productos"
        })
    }
}

const addNewProduct = async (req: any, res: any) => {
    const { name, category, gender, promo, favorite, photo } = req.body
    const newProduct = {
        name,
        category,
        gender,
        promo,
        favorite,
        photo
    }

    try {
        const productSaved = await prisma.products.create({ data: newProduct })
        res.send(json(productSaved))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al agregar el producto"
        })
    }
}

const updateProduct = async (req: any, res: any) => {
    const productId = +req.params.id;
    try {
        const productExist = await prisma.products.findUnique({
            where: {
                id: productId
            }
        })

        if (!productExist) {
            return res.status(404).json({
                msg: "El producto no existe"
            })
        }
        const productInfo = req.body;
        const productUpdated = await prisma.products.update({
            where: {
                id: productId
            },
            data: productInfo
        })
        res.send(json(productUpdated))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al actualizar el producto"
        })
    }
}

const deleteProduct = async (req: any, res: any) => {
    const productId = +req.params.id;
    try {
        const productExist = await prisma.products.findUnique({
            where: {
                id: productId
            }
        })
        if (!productExist) {
            return res.status(404).json({
                msg: "El producto no existe"
            })
        }
        const productDeleted = await prisma.products.delete({
            where: {
                id: productId
            }
        })
        res.send(json(productDeleted))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al eliminar el producto"
        })
    }
}

export {
    getProducts,
    addNewProduct,
    updateProduct,
    deleteProduct
}