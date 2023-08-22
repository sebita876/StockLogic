import mongoose from 'mongoose';

const prestamoSchema = new mongoose.Schema({
    profesor: {
        type: String,
        require: true
    },
    curso: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
    alumno: {
        type: String,
        require: true
    },
    articulo: {
        type: Number,
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    fecha: {
        type: String,
        require: true,
        default: function () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today.toLocaleDateString();
        }
    }
});
const Prestamo = mongoose.models.Prestamo || mongoose.model('Prestamo', prestamoSchema);

export default Prestamo;