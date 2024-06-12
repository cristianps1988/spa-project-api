import { PrismaClient } from "@prisma/client";
import json from '../helpers/jsonBigInt';

const prisma = new PrismaClient()

const getGender = async (_req: any, res: any) => {
    try {
        const gender = await prisma.gender.findMany()
        if (!gender) {
            return res.status(404).json({
                msg: "No hay generos guardados"
            })
        }
        res.send(json(gender))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al obtener los generos"
        })
    }
}

const addGender = async (req: any, res: any) => {
    const newGender = {
        gender: req.body.gender
    }

    try {
        const genderSaved = await prisma.gender.create({ data: newGender })
        res.send(json(genderSaved))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al agregar el género"
        })
    }
}

const updateGender = async (req: any, res: any) => {
    const genderId = req.params.id;
    try {
        const genderExist = await prisma.gender.findUnique({
            where: {
                id: genderId
            }
        })

        if (!genderExist) {
            return res.status(404).json({
                msg: "El genero no existe"
            })
        }
        const genderInfo = req.body;
        const genderUpdated = await prisma.gender.update({
            where: {
                id: genderId
            },
            data: genderInfo
        })
        res.send(json(genderUpdated))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al actualizar el género"
        })
    }
}

const deleteGender = async (req: any, res: any) => {
    const genderId = req.params.id;
    try {
        const genderExist = await prisma.gender.findUnique({
            where: {
                id: genderId
            }
        })

        if (!genderExist) {
            return res.status(404).json({
                msg: "El género no existe"
            })
        }
        const genderDeleted = await prisma.gender.delete({
            where: {
                id: genderId
            }
        })
        res.send(json(genderDeleted))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al eliminar el género"
        })
    }
}

export {
    getGender,
    addGender,
    updateGender,
    deleteGender
}