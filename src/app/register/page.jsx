'use client'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import * as Validaciones from './validar'
export default function Login() {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const guardarUsuario = () => {
        const opcion = document.querySelector('input[name="opcion"]:checked')
        const id = opcion.id
        const admin = document.getElementById(id).value
        if (opcion && opcion.value === "true") {
            setModalOpen(true)
        } else {
            const validar = Validaciones.validarUsuario(closeModal, router)
        }
    }
    return (
        <div>
            <div className='fondo' />
            {modalOpen && (
                <div className="contenedor3">
                    <div className="modal-overlay">
                        <h1 className='text' id='H2 hidden' hidden={false}>Ingrese el nombre del admin</h1>
                        <h1 className='text' id='HI hidden' hidden={true}>Admin no encontrado</h1>
                        <div className="close-button" onClick={() => closeModal()} />
                        <input className='inputt' type="number" id='dniAdmin' placeholder='DNI' onInput={(e) => {
                            if (e.target.value.length > 8) {
                                e.target.value = e.target.value.slice(0, 8);
                            }
                        }} />
                        <input className='inputt' type="text" id='contraseñaAdmin' placeholder='Contaseña' />
                        <button className='botonto' onClick={() => { Validaciones.verificarAdmin(closeModal) }}>cerrar</button>
                    </div>
                </div>)}
            <div className='login'>
                <div className='container'>
                    <div className='fotoStock' />
                    <div>
                        <div>
                            <h1 id="H1hidden" className='text' hidden={true}>Usuario Invalido</h1>
                            <h1 id="H2hidden" className='text' hidden={true}>Guardado Correctamente</h1>
                        </div>
                        <input type="number" placeholder="DNI" className='inputTextLogin' id='DNI' onInput={(e) => {
                            if (e.target.value.length > 8) {
                                e.target.value = e.target.value.slice(0, 8);
                            }
                        }} />
                        <input type="text" placeholder="Contraseña" className='inputTextLogin' id='contraseña' />
                        <input cla type="text" placeholder="Repetir Contaseña" className='inputTextLogin' id='RepContraseña' />
                        
                    </div>
                    <label className='admin'>Admin</label>
                    <div className='containerCheck'>
                        
                        <input type="radio" id="AdminTrue" name="opcion" value={true} />
                        <label for="AdminTrue">Si</label>
                        <input className='sino' type="radio" id="AdminFalse" name="opcion" value={false} />
                        <label className='sino' for="AdminFalse">No</label>
                    </div>
                    <input type="submit" value="Registrarse" className='botom' onClick={() => { guardarUsuario() }} />
                </div>
            </div>
        </div>
    );
}