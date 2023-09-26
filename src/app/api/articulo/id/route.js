import { NextResponse } from 'next/server';
import Conectar from '@/bd/conectarse';
import Herramienta from '@/bd/models/herramientas';

Conectar()

export async function PUT(req) {
    try {
        const requesData = await req.json()
        let { id, disponible } = requesData
        const _id = await Herramienta.find({ id: id })
        const Update = await Herramienta.findByIdAndUpdate(_id[0]._id, {disponible : disponible }, { new: true })
        return NextResponse.json({ status: 200, message: 'Actualizado exitosamente', data: Update })
    } catch (error) {
        console.log(error)
    }
}

