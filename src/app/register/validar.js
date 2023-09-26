import axios from "axios";
const traerUsuarios = async () => {
    const lista = await axios.get('/api/usuarios')
    return lista
}
async function guardarUsuario(dni, contraseña, nombre) {
    await axios.post('/api/usuarios', {
        dni: dni,
        contraseña: contraseña,
        nombre: nombre
    }).then(data => console.log("guardado"))
}
export async function validarUsuario(router) {
    const nombre = document.getElementById('Nombre').value
    const dni = document.getElementById('DNI').value
    const contraseña = document.getElementById('contraseña').value
    const repContraseña = document.getElementById('RepContraseña').value
    let validarContraseña
    const listaUsuarios = await traerUsuarios()
    const arrayDni = listaUsuarios.data.datos.map(elemento => elemento.dni == dni)
    const validacionDni = arrayDni.includes(true)
    if (contraseña != "") {
        if (contraseña == repContraseña) {
            validarContraseña = true
        } else {
            validarContraseña = false
        }
    } else {
        document.getElementById("H1hidden").hidden = false
        document.getElementById("H2hidden").hidden = true
        return
    }
    if (validacionDni == false && validarContraseña == true) {
        guardarUsuario(dni, contraseña, nombre)
        router.push('/')
    } else {
        document.getElementById("H2hidden").hidden = true
        document.getElementById("H1hidden").hidden = false
    }
}
