import { NextResponse } from 'next/server';
import Conectar from '@/bd/conectarse';
import Prestamo from '@/bd/models/prestamo';

export async function PUT(req) {
    try {
        await Conectar()
        const requesData = await req.json()
        let { id, fecha } = requesData
        const _id = await Prestamo.find({ id: id })
        const Update = await Prestamo.findByIdAndUpdate(_id[0]._id, { fechaDev: fecha }, { new: true })
        return NextResponse.json({ status: 200, message: 'Actualizado exitosamente', data: Update })
    } catch (error) {
        console.log(error)
    }
}

