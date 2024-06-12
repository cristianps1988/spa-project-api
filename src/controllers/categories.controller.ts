import { PrismaClient } from "@prisma/client";
import json from '../helpers/jsonBigInt';

const prisma = new PrismaClient()

const getCategories = async (_req: any, res: any) => {
    try {
        const categories = await prisma.category.findMany()
        if (!categories) {
            return res.status(404).json({
                msg: "No hay categorias guardadas"
            })
        }
        res.send(json(categories))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al obtener las categorías"
        })
    }
}

const addNewCategory = async (req: any, res: any) => {
    const newCategory = {
        category: req.body.category
    }

    try {
        const categorySaved = await prisma.category.create({ data: newCategory })
        res.send(json(categorySaved))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al agregar la categoría"
        })
    }
}

const updateCategory = async (req: any, res: any) => {
    const categoryId = req.params.id;
    try {
        const categoryExist = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!categoryExist) {
            return res.status(404).json({
                msg: "La categoría no existe"
            })
        }
        const categoryInfo = req.body;
        const categoryUpdated = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: categoryInfo
        })
        res.send(json(categoryUpdated))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al actualizar la categoría"
        })
    }
}

const deletCategory = async (req: any, res: any) => {
    const categoryId = req.params.id;
    try {
        const categoryExist = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!categoryExist) {
            return res.status(404).json({
                msg: "La categoría no existe"
            })
        }
        const categoryDeleted = await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
        res.send(json(categoryDeleted))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al eliminar la categoría"
        })
    }
}

export {
    getCategories,
    addNewCategory,
    updateCategory,
    deletCategory
}