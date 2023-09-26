import mongoose from "mongoose";
const usuariosSchema = new mongoose.Schema({
    dni: {
        type: Number,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

const Usuarios = mongoose.models.Usuarios || mongoose.model('Usuarios', usuariosSchema);



export default Usuarios;