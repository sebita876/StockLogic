'use client'
import { useEffect, useState } from "react"
import { Lista } from "@/components/lista";
import { Articulo } from "@/components/articulo";
import { useRef } from "react";
import axios from "axios";
import * as Validaciones from "./validar";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./loading";
import { Prestamo } from "@/components/prestamo";
import { Lit } from "@/components/li";
import { parseCookies } from "nookies";

export default function Inventario() {
  const cookie = parseCookies()
  let [listaSelect, setListaSelect] = useState([])
  const agregarSelect = () => {
    let id = 0
    const length = listaSelect.length
    if (length == 0) {
      id = 1
    }
    else {
      const resta = listaSelect.length - 1
      const objeto = listaSelect[resta]
      const props = objeto.props.id
      id = props + 1
    }
    const componente = <Lit
      lista={listaArticulo}
      function={change}
      function2={eliminarSelect}
      id={id}
      state={listaSelect}
    />
    setListaSelect([...listaSelect, componente])
  }
  const [articulosPrestados, setArticulosPrestados] = useState([])
  const [listaPrestamos, setListaPrestamos] = useState([])
  const [mostarLista, setMostarList] = useState(false)
  const [articulos, setArticulos] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  let [listaArticulo, setListaArticulo] = useState([])
  let [copiaListaArticulo, setCopiaListaArticulo] = useState([])
  useEffect(() => {
    setCopiaListaArticulo(listaArticulo)
  }, [listaArticulo])
  const [busqueda, setBusqueda] = useState("")
  const [busquedaArt, setBusquedaArt] = useState("")
  const [select, setSelect] = useState([])
  let [listaCat, setListaCat] = useState([])
  useEffect(() => {
    const init = async () => {
      await TraerArticulos()
      await traerPrestamos()
      await TraerCat()
    }
    init()
  }, [])
  const [articulosPrestadosBien, setArticulosPrestadosBien] = useState([])
  useEffect(() => {
    setArticulosPrestadosBien([...articulosPrestadosBien, ...articulosPrestados])
  }, [articulosPrestados])
  useEffect(() => {
    const init = async () => {
      if (listaArticulo.length !== 0) {
        BorrarListaCat()
        TraerCat()
      }
    }
    init()
    const array = listaArticulo.map(elemento => elemento.props)
    setArticulos(array)
  }, [listaArticulo])
  useEffect(() => {
    listaCatBien = listaCat
  }, [listaCat])
  const [copia, setCopia] = useState([])
  useEffect(() => {
    const componentes = listaSelect.map((element, index) => (
      <Lit
        key={element.props.id}
        lista={listaArticulo}
        function={change}
        function2={eliminarSelect}
        id={element.props.id}
        state={listaSelect}
      />
    ))
    console.log("effect Componentes", componentes)
    setCopia(componentes)
  }, [listaSelect])
  useEffect(() => {
  }, [mostarLista])
  useEffect(() => {
  }, [articulos, listaArticulo]);
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenError, setModalOpenError] = useState(false)
  const openModalError = () => {
    setModalOpenError(true)
  }
  const closeModalError = () => {
    setModalOpenError(false)
  }
  const [modalOpenError2, setModalOpenError2] = useState(false)
  const openModalError2 = () => {
    setModalOpenError2(true)
  }
  const closeModalError2 = () => {
    setModalOpenError2(false)
  }
  const openModal = () => {
    const lista = listaCat.length
    if (lista !== 0) {
      setModalOpen(true)
    } else {
      openModalError(true)
    }
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const [modalOpen2, setModalOpen2] = useState(false)
  const openModal2 = () => {
    setModalOpenError(false)
    setModalOpen2(true)
    setModalOpen4(false)
  }
  const closeModal2 = () => {
    setModalOpen2(false)
  }
  const [modalOpen3, setModalOpen3] = useState(false)
  const openModal3 = () => {
    setModalOpen3(true)
    setModalOpen4(false)
  }
  const closeModal3 = () => {
    setModalOpen3(false)
  }
  const [modalOpen9, setModalOpen9] = useState(false)
  const openModal9 = () => {
    setModalOpen9(true)
  }
  const closeModal9 = () => {
    setListaSelect([])
    setModalOpen9(false)
  }
  const [modalOpen4, setModalOpen4] = useState(false)
  const openModal4 = () => {
    setModalOpen4(!modalOpen4)
  }
  const closeModal4 = () => {
    setModalOpen4(false)
  }
  const [modalOpen5, setModalOpen5] = useState(false)
  const openModal5 = () => {
    setModalOpen5(true)
    setModalOpen4(false)
  }
  const closeModal5 = () => {
    setModalOpen5(false)
  }
  const [modalOpen6, setModalOpen6] = useState(false)
  const openModal6 = () => {
    const lista = listaCat.length
    const lista2 = listaArticulo.length
    if (lista !== 0) {
      if (lista2 == 0) {
        openModalError2()
      } else {
        setModalOpen6(true)
      }
    } else {
      openModalError(true)
    }

  }
  const closeModal6 = () => {
    setModalOpen6(false)
  }
  const [modalOpen7, setModalOpen7] = useState(false)
  const openModal7 = () => {
    const lista = listaCat.length
    const lista2 = listaArticulo.length
    if (lista !== 0) {
      if (lista2 == 0) {
        openModalError2()
      } else {
        setModalOpen7(true)
      }
    } else {
      openModalError(true)
    }
  }
  const closeModal7 = () => {
    setModalOpen7(false)
  }
  const [mostrarPrestamo, setMostrarPrestamo] = useState(false)
  const [modalOpenAyuda, setModalOpenAyuda] = useState(false)
  const openModalAyuda = () => {
    setModalOpenAyuda(!modalOpenAyuda)
  }
  //_______________________________________________PRESTAMOS_______________________________________________//
  const prueba = (fechaDev) => {
    if (fechaDev === undefined) {
      return true
    } else {
      return false
    }
  }
  const traerPrestamos = async () => {
    try {
      const res = await axios.get('/api/prestamos');
      const lista = res.data.datos;

      const groupedById = {};

      lista.forEach((dato) => {
        const { id, articulo, cantidad, profesor, curso, hora, usuario, fecha, fechaDev } = dato;

        if (!groupedById[id]) {
          groupedById[id] = [];
        }

        groupedById[id].push({ articulo, cantidad, profesor, curso, hora, usuario, fecha, fechaDev });
      });

      const newComponents = Object.entries(groupedById).map(([id, elementos]) => (
        <Prestamo
          key={id}
          id={id}
          articulos={elementos}
          profesor={elementos[0].profesor}
          curso={elementos[0].curso}
          hora={elementos[0].hora}
          prestador={elementos[0].usuario}
          fecha={elementos[0].fecha}
          Activo={prueba(elementos[0].fechaDev)}
          fechaDev={elementos[0].fechaDev}
          function={devolverDisponible}
          state={listaArticulo}
        />
      ));

      setListaPrestamos([...listaPrestamos, ...newComponents]);
    } catch (error) {
      console.error('Error al obtener los prestamos:', error);
    }
  }

  //_______________________________________________ARTICULO_________________________________________________//
  const funcion = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toLocaleDateString();
  }
  function handleKeyPress(event) {
    if (event.key === "e") {
      event.preventDefault();
    }
  }
  const AgregarArticulo = () => {//_________________________Agregar Articulo__________________________//
    let id
    const nombre = document.getElementById("nombre").value
    const categoria = document.getElementById("categoria").value
    const cantidad = document.getElementById("cantidad").value
    const valido = Validaciones.ValidarArticulo(listaArticulo, nombre, cantidad)
    if (valido == true) {
      const length = listaArticulo.length
      if (length == 0) {
        id = 1
      }
      else {
        const resta = listaArticulo.length - 1
        const objeto = listaArticulo[resta]
        const props = objeto.props.id
        id = props + 1
      }
      const newComponent = <Articulo
        fecha={funcion()}
        nombre={nombre.toLowerCase()}
        id={id}
        categoria={categoria}
        cantidad={cantidad}
        disponible={cantidad}
      />
      setListaArticulo([...listaArticulo, newComponent])
      GuardarArticulo(nombre.toLowerCase(), id, categoria, cantidad);
      closeModal()
    } else {
      document.getElementById("H1 hidden").hidden = false
    }
  }
  const GuardarArticulo = async (nombre, id, categoria, cantidad) => {//___________________Guardar Articulo_______________//
    try {
      closeModal()
      await axios.post('/api/articulo', {
        nombre: nombre,
        id: id,
        categoria: categoria,
        cantidad: cantidad,
        disponible: cantidad
      })
        .then(data => console.log('guardao'))
    } catch (error) {
      console.log(error)
    }
  };
  const TraerArticulos = async () => {//_________________________Traer Articulo__________________________//
    try {
      const herramientas = await axios.get('/api/articulo').then(res => {
        const lista = res.data.datos
        setArticulos(res.data.datos)
        const newComponent = lista.map(dato => (
          <Articulo
            key={dato.id}
            nombre={dato.nombre}
            fecha={dato.fecha}
            id={dato.id}
            categoria={dato.categoria}
            cantidad={dato.cantidad}
            disponible={dato.disponible} />))
        setListaArticulo([...listaArticulo, ...newComponent])
      })
    } catch (error) {
      setIsLoading(false);
    }
  }
  const SeleccionarArticulo = () => {
    try {
      const resultado = articulos.find(element => element.nombre === document.getElementById("select").value)
      document.getElementById("busqueda").value = resultado.nombre
      document.getElementById("inputnombre").value = resultado.nombre
      document.getElementById("inputcantidad").value = resultado.cantidad
      document.getElementById("inputid").value = resultado.id
      document.getElementById("inputcategoria").value = resultado.categoria
      document.getElementById("H2 hidden").hidden = true
    } catch {
      document.getElementById("H1 hidden").hidden = true
      document.getElementById("H2 hidden").hidden = false
    }
  }
  const SeleccionarArticulo2 = () => {
    try {
      const resultado = articulos.find(element => element.nombre === document.getElementById("select").value)

    } catch {
    }
  }
  const ActualizarArticulo = async () => {
    const nombre = document.getElementById("inputnombre").value
    const categoria = document.getElementById("inputcategoria").value
    const cantidad = document.getElementById("inputcantidad").value
    const busqueda = document.getElementById("busqueda").value
    const valido = Validaciones.ValidarEditarArticulo(listaArticulo, cantidad, busqueda)
    if (valido == true) {
      try {
        const id = document.getElementById("inputid").value
        const ArticuloActualizar = await axios.put('/api/articulo', {
          id: id,
          nombre: nombre,
          categoria: categoria,
          cantidad: cantidad,
          fecha: funcion()
        })
        const copia = [...listaArticulo]
        const encontrarComp = copia.find(elemento => elemento.props.nombre === busqueda)
        const indice = copia.indexOf(encontrarComp)
        const componente = <Articulo
          key={id}
          nombre={nombre}
          fecha={funcion()}
          id={id}
          categoria={categoria}
          cantidad={cantidad}
          disponible={cantidad}
        />
        copia[indice] = componente
        setListaArticulo(copia)
        closeModal6()
        document.getElementById("inputcategoria").value = ""
      } catch (error) {
        console.log(error)
      }
    } else {
      document.getElementById("H2 hidden").hidden = true
      document.getElementById("H1 hidden").hidden = false
    }
  }
  const BorrarArticulo = async () => {//------------------Borrar Articulos---------------------------------//
    const id = document.getElementById("borrar").value
    const validar = Validaciones.ValidarId(listaArticulo, id)
    if (validar == true) {
      try {
        const response = await axios.put('/api/articulo', {
          id: id
        })
        const componente = listaArticulo.find(element => element.props.id == id)
        const index = listaArticulo.indexOf(componente)
        const copia = [...listaArticulo]
        copia.splice(index, 1)
        setListaArticulo(copia)
        closeModal7()
      } catch (error) {
        console.log(error)
      }
    } else {
      document.getElementById("H1 hidden").hidden = false
    }
  }
  //_______________________________________________CATEGORIA_______________________________________________//
  let listaCatBien
  const BorrarListaCat = () => {
    const array = []
    setListaCat(listaCat = array)

  }
  const [artFiltrado, setArtFiltrado] = useState([])
  const filtrarCat = (nombre, state) => {
    setMostrarPrestamo(false)
    const filtrado = state.filter(elemento => elemento.props.categoria === nombre)
    setArtFiltrado(filtrado)
    setMostarList(true)
  }
  const AgregarCat = () => { //_________________________Agregar Categoria__________________________//
    const nombre = document.getElementById("nombre").value
    const validacion = Validaciones.ValidarCat(listaCat, nombre)
    if (validacion == true) {
      closeModal2()
      let id
      const length = listaCat.length
      if (length == 0) {
        id = 1
      }
      else {
        const resta = listaCat.length - 1
        const objeto = listaCat[resta]
        const props = objeto.props.id
        id = props + 1
      }
      const newComponent =
        <Lista
          nombre={nombre.toLowerCase()}
          id={id}
          funcion={filtrarCat}
          state={listaArticulo} />
      setListaCat([...listaCat, newComponent])
      guardarCat(nombre.toLowerCase(), id)
    }
    else {
      document.getElementById("H1 hidden").hidden = false
    }
  }
  const guardarCat = async (nombre, id) => {//_________________________Guardar Categoria__________________________//
    try {
      await axios.post('/api/categoria', {
        id: id,
        nombre: nombre
      }).then
        (data => console.log('guardao'))
    } catch (error) {
      console.log(error)
    }
  };
  const TraerCat = async () => {//_________________________Traer Categorias__________________________//
    try {
      const categorias = await axios.get('/api/categoria').then(res => {
        const lista = res.data.datos
        const newComponent = lista.map(dato => (
          <Lista
            key={dato._id}
            id={dato.id}
            nombre={dato.nombre}
            funcion={filtrarCat}
            state={listaArticulo} />))
        setListaCat([...listaCat, ...newComponent])
        setIsLoading(false);
      })
    } catch (error) {
      console.log(error)
    }
  }
  const ActualizarCat = async () => {//______________Actualizar Categoria___________//
    const nombre = document.getElementById("nombre").value
    const actualizar = document.getElementById("nuevo").value
    const validar = Validaciones.ValidarActualizarCat(listaCat, nombre, actualizar)
    if (validar == true) {
      try {
        closeModal5()
        const CategoriaActualizar = await axios.put('/api/categoria', {
          nombre: nombre,
          actualizar: actualizar
        })
        const copia = [...listaCat]
        const encontrarComponente = copia.find((componente) => componente.props.nombre === nombre)
        if (encontrarComponente) {
          const indice = copia.indexOf(encontrarComponente)
          const componente = <Lista
            nombre={actualizar}
            key={encontrarComponente.key}
            id={encontrarComponente.props.id}
            funcion={filtrarCat}
            state={listaArticulo} />
          copia[indice] = componente
          setListaCat(copia)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      document.getElementById("H1 hidden").hidden = false
    }
  }
  const BorrarCat = async () => {//------------------Borrar Categoria---------------------------------//
    const nombre = document.getElementById("borrar").value
    const validar = Validaciones.ValidarBorrarCat(listaCat, nombre)
    if (validar == true) {
      closeModal3()
      try {
        const response = await axios.put('/api/categoria', {
          nombre: nombre
        })
        const array = listaCat.filter(element => element.props.nombre !== nombre)
        setListaCat(array)
      } catch (error) {
        console.log(error)
      }
    } else {
      document.getElementById("H1 hidden").hidden = false
    }
  }
  const inputRef = useRef(null)
  const apretarTecla = (event) => {
    if (event.keyCode === 13) {
      inputRef.current.blur()
    }
  }
  const cambios = e => {
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }
  const filtrar = (params) => {
    var resultado = articulos.filter((elemento) => {
      if (elemento.nombre.toString().toLowerCase().includes(params.toLowerCase())) {
        return (elemento.nombre)
      }
    })
    setSelect(resultado)
  }
  const cambiosArticulo = e => {
    setBusquedaArt(e.target.value)
    filtrarArticulo(e.target.value)
  }
  const filtrarArticulo = (params) => {
    if (!mostrarPrestamo) {
      var resultado = listaArticulo.filter((elemento) => {
        if (elemento.props.nombre.toString().toLowerCase().includes(params.toLowerCase())) {
          return elemento
        }
      })
      setArtFiltrado(resultado)
      if (params == "") {
        setMostarList(false)
      } else {
        setMostarList(true)
      }
    } else {
      var resultado = listaPrestamos.filter((elemento) => {
        if (elemento.props.profesor.toString().toLowerCase().includes(params.toLowerCase())) {
          return elemento
        }
      })
      setArtFiltrado(resultado)
      if (params == "") {
        setMostarList(false)
      } else {
        setMostarList(true)
      }
    }
  }
  const filtrarAZ = () => {
    if (!mostrarPrestamo) {
      const valor = document.getElementById("ordenar").value
      setMostarList(true)
      if (valor == "a-z") {
        const filtrador = [...listaArticulo].sort((a, b) => {
          return a.props.nombre.localeCompare(b.props.nombre)
        })
        setArtFiltrado(filtrador)
      } else if (valor == "z-a") {
        const filtrador = [...listaArticulo].sort((a, b) => {
          return b.props.nombre.localeCompare(a.props.nombre)
        })
        setArtFiltrado(filtrador)
      } else if (valor == "+/-") {
        setMostarList(false)
      } else if (valor == "-/+") {
        const filtrador = [...listaArticulo].sort((a, b) => b.props.id - a.props.id)
        setArtFiltrado(filtrador)
      } else {
        setMostarList(false)
      }
    } else {
      const valor = document.getElementById("ordenar").value
      setMostarList(true)
      if (valor == "a-z") {
        const filtrador = [...listaPrestamos].sort((a, b) => {
          return a.props.profesor.localeCompare(b.props.profesor)
        })
        setArtFiltrado(filtrador)
      } else if (valor == "z-a") {
        const filtrador = [...listaPrestamos].sort((a, b) => {
          return b.props.profesor.localeCompare(a.props.profesor)
        })
        setArtFiltrado(filtrador)
      } else {
        setMostarList(false)
      }
    }

  }
  const [tema, setTema] = useState(false)
  const modo = () => {
    setTema(!tema)
  }
  const devolverDisponible = (articulos) => {
    setMostrarPrestamo(false);
    const copia2 = [...listaArticulo];
    const promises = articulos.map(async (elemento) => {
      const index = copia2.findIndex((element) => element.props.nombre === elemento.articulo);
      const copia = copia2[index];
      const cant = copia.props.cantidad;
      console.log(copia.props.disponible, "Disponible", elemento.cantidad, "Cantidad")
      const nuevoDisponible = parseInt(copia.props.disponible);
      console.log(nuevoDisponible)
      // Realizar la operación PUT para actualizar los disponibles en la API
      const response = await axios.put('/api/articulo/id', {
        id: copia.props.id,
        disponible: nuevoDisponible
      });

      // Crear el nuevo componente Articulo
      const nuevoComponente = (
        <Articulo
          fecha={copia.props.fecha}
          nombre={copia.props.nombre}
          id={copia.props.id}
          categoria={copia.props.categoria}
          cantidad={parseInt(cant)}
          disponible={nuevoDisponible}
        />
      );

      copia2[index] = nuevoComponente;

      return response.data; // Devolver los datos del registro de préstamo
    });

    Promise.all(promises)
      .then(() => {
        // Cuando todas las operaciones se completen, actualiza listaArticulo
        setListaArticulo(copia2);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



  const agregarPrestamo = () => {
    setMostrarPrestamo(false)
    let id;
    const length = listaPrestamos.length;

    if (length === 0) {
      id = 1;
    } else {
      const resta = length - 1;
      const objeto = listaPrestamos[resta];
      const props = objeto.props.id;
      id = parseInt(props) + 1;
    }
    const profesor = document.getElementById("Prof").value;
    const curso = document.getElementById("Curso").value;
    const hora = document.getElementById("Hora").value;
    const cantidades = {};
    const articulosPrestadosFiltrados = articulosPrestadosBien.filter((elemento) => {
      const { articulo, cantidad } = elemento;
      if (cantidades[articulo]) {
        cantidades[articulo] = cantidad;
        return false;
      }
      cantidades[articulo] = cantidad;
      return true;
    });
    try {
      const data = articulosPrestadosFiltrados.map(async (elemento) => await axios.post('/api/prestamos', {
        profesor: profesor,
        curso: curso,
        hora: hora,
        usuario: cookie.isLogged,
        articulo: elemento.articulo,
        cantidad: elemento.cantidad,
        fecha: funcion(),
        id: id
      }));
      const copia2 = [...listaArticulo];
      const promises = articulosPrestadosFiltrados.map(async (elemento) => {
        const index = listaArticulo.findIndex((element) => element.props.nombre === elemento.articulo);
        const copia = listaArticulo[index];

        // Realizar la operación PUT para actualizar los disponibles en la API
        const response = await axios.put('/api/articulo/id', {
          id: copia.props.id,
          disponible: copia.props.disponible - elemento.cantidad
        });

        const nuevaCant = copia.props.disponible;

        // Crear el nuevo componente Articulo
        const nuevoComponente = (
          <Articulo
            fecha={copia.props.fecha}
            nombre={copia.props.nombre}
            id={copia.props.id}
            categoria={copia.props.categoria}
            cantidad={copia.props.cantidad}
            disponible={parseInt(nuevaCant) - elemento.cantidad}
          />
        );

        copia2[index] = nuevoComponente;

        return response.data; // Devolver los datos del registro de préstamo
      });

      Promise.all(promises)
        .then(() => {
          // Cuando todas las operaciones se completen, actualiza listaArticulo
          setListaArticulo(copia2);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      const newComponent = <Prestamo
        profesor={profesor}
        hora={hora}
        curso={curso}
        prestador={cookie.isLogged}
        fecha={funcion()}
        id={id}
        articulos={articulosPrestadosFiltrados}
        Activo="-"
        function={devolverDisponible}
        state={listaArticulo}
      />
      setListaPrestamos([...listaPrestamos, newComponent])
      setArticulosPrestados([])
      setArticulosPrestadosBien([])
      setListaSelect([])
      closeModal9()
    } catch {
      console.log("error");
    }
  }


  const eliminarSelect = async (key) => {
    const index = listaSelect.findIndex((element) => element.props.id == key);
    const copi = [...listaSelect];
    console.log("copia antes", copi)
    copi.splice(index, 1);
    console.log("copia despues", copi)
    setListaSelect(copi);
  }
  const change = (key) => {
    const art = document.getElementById(key).value
    const cant = document.getElementById("input" + key).value
    const indexArticulo = listaArticulo.findIndex((element) => element.props.nombre == art)
    const cantidadArticulos = listaArticulo[indexArticulo].props.disponible
    if (cant <= cantidadArticulos) {
      document.getElementById("close" + key).hidden = false
      document.getElementById("boton" + key).style.backgroundColor = "#005747"
      document.getElementById("boton" + key).style.cursor = "not-allowed"
      document.getElementById("boton" + key).disabled = true
      document.getElementById("h1" + key).hidden = true
      document.getElementById("h2" + key).hidden = true
      const objeto = {
        articulo: art,
        cantidad: cant
      }
      const index = articulosPrestadosBien.findIndex((element) => element.articulo === art)
      setArticulosPrestados([...articulosPrestados, { ...objeto }])
    } else {
      document.getElementById("h1" + key).hidden = false
      document.getElementById("h2" + key).hidden = false
    }
  }
  //=====================================Return=======================================================//
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={tema ? 'fondo3-white' : 'fondo3'} id="fondo3">
          {modalOpenAyuda && (
            <div className={`desplegable2 ${modalOpenAyuda ? 'visible' : ''}`}>
              <p className={tema ? 'Error2-white' : 'Error2'}>
                * Para poder agregar un articulo deberas hacer una categoria, la cual la podras hacer apretando en las 3 rayas de
                abajo a la izquierda, ahi presionaras "añadir cat", ahora si, apretando el boton con un simbolo de mas, podras agregar el articulo, donde colocaras el nombre, la categoria en la que quiere en la que este y la cantidad, la fecha e id se pondran automaticamente.
                <br /><br />* El editor de articulo, tendras que buscar el nombre de este para editar las siguientes caracteristicas: nombre, categoria y cantidad. El id y la fecha no se podra modificar
                <br /><br />* Para eliminar un articulo se debe precionar el boton que tiene una equis e ingresar el ID del articulo que desea eliminar
                <br /><br />* Si quiere editar una categoria, debe precionar en las 3 rayas de la izquierda, editar cat y a continuacion ingresar el nombre de la cat que quiere cambiar y el nuevo n
              </p>
            </div>
          )}
          {modalOpenError && (
            <div className={tema ? 'modalError-white' : 'modalError'}>
              <div className="close-button" onClick={closeModalError} />
              <p className="Error">Ingrese una categoria antes</p>
            </div>
          )}
          {modalOpenError2 && (
            <div className={tema ? 'modalError-white' : 'modalError'}>
              <div className="close-button" onClick={closeModalError2} />
              <p className="Error">Ingrese un articulo primero</p>
            </div>
          )}
          {modalOpen && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay-white' : 'modal-overlay'}>
                <div className="close-button" onClick={() => closeModal()} />
                <h1 id="" className="H1">Agregar Articulo</h1>
                <h1 id="H1 hidden" className="escondido" hidden={true}>Articulo Invalido</h1>
                <input type="text" placeholder="Nombre" id="nombre" className={tema ? 'inputt-white' : 'inputt'} />
                <h3 className="h3">Categoria</h3>
                <select name="" className={tema ? 'selec-white' : 'selec'} id="categoria">
                  {listaCat.map((elemento) => (
                    <option key={elemento.props.nombre} value={elemento.props.nombre}>
                      {elemento.props.nombre}
                    </option>))}
                </select>
                <input type="number" placeholder="Cantidad" id="cantidad" className={tema ? 'inputt-white' : 'inputt'} onKeyPress={handleKeyPress} />
                <button className="botonto" onClick={() => { AgregarArticulo() }}>Agregar</button>
              </div>
            </div>
          )}
          {modalOpen6 && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay2-white' : 'modal-overlay2'}>
                <div className="close-button" onClick={() => closeModal6()} />
                <div className="content">
                  <h1 className="H1">Actualizar Articulo</h1>
                  <h1 id="H2 hidden" className="escondido2" hidden={true}>Articulo no encontrado</h1>
                  <h1 id="H1 hidden" className="escondido2" hidden={true}>Articulo Invalido</h1>
                  <h1 className="h1">Ingrese el nombre</h1>
                  <input
                    type="search"
                    className={tema ? 'inputt-white' : 'inputt'}
                    placeholder="Busqueda"
                    onChange={cambios}
                    onKeyDown={apretarTecla}
                    ref={inputRef}
                    id="busqueda"
                    onBlur={SeleccionarArticulo} />
                  <select name="" className={tema ? 'selec-white' : 'selec'} id="select" onChange={SeleccionarArticulo}>
                    {select.map((elemento) =>
                      <option key={elemento.id} value={elemento.nombre} >{elemento.nombre}</option>)}
                  </select>
                </div>
                <div className="content">

                  <h1 className="h1">Articulo</h1>
                  <input type="text" id="inputnombre" className={tema ? 'inputt-white' : 'inputt'} placeholder="Nombre" />
                  <input type="text" id="inputid" hidden />
                  <h3 className="h3">Categoria</h3>
                  <select name="" className={tema ? 'selec-white' : 'selec'} id="inputcategoria">
                    {listaCat.map((elemento) => (
                      <option key={elemento.props.nombre} value={elemento.props.nombre}>
                        {elemento.props.nombre}
                      </option>))}
                  </select>
                  <input type="number" id="inputcantidad" className={tema ? 'inputt-white' : 'inputt'} placeholder="Cantidad" onKeyPress={handleKeyPress} />
                  <button className="botonto" onClick={ActualizarArticulo}>Actualizar</button>
                </div>
              </div>
            </div>)}
          {modalOpen9 && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay2-white' : 'modal-overlay2'}>
                <div className="close-button" onClick={() => closeModal9()} />
                <div className="content">

                  <h1 className="H1">Prestamo</h1>
                  <div className="agregar" onClick={agregarSelect}></div>
                  <h1 className="h1">Articulos</h1>
                  <div className="contSelector">
                    {copia.map((componente, index) => (
                      <div className="divSelec" key={index}>{componente}</div>
                    ))}
                  </div>
                </div>
                <div className="content">
                  <input type="text" className="inputt" placeholder="Profesor" id="Prof" />
                  <input type="text" className="inputt" placeholder="Curso" id="Curso" />
                  <input type="time" name="" className="inputt" id="Hora" />
                  <button className="botonto" onClick={agregarPrestamo}>Agregar</button>
                </div>
              </div>
            </div>)}
          {modalOpen2 && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay-white' : 'modal-overlay'}>
                <div className="close-button" onClick={() => closeModal2()} />
                <div className="modal-content">
                  <h1 className="H1">Agregar Categoria</h1>
                  <h1 className="escondido" hidden={true} id="H1 hidden">Nombre Invaldio</h1>
                  <input type="text" placeholder="Nombre" id="nombre" className={tema ? 'inputt-white' : 'inputt'} />
                  <button className="botonto" onClick={AgregarCat}>Agregar</button>
                </div>
              </div>
            </div>)}
          {modalOpen5 && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay-white' : 'modal-overlay'}>
                <div className="close-button" onClick={() => closeModal5()} />
                <h1 className="escondido" id="H1 hidden" hidden={true}>Nombre invalido</h1>
                <div className="modal-content">
                  <h1 className="H1">Editar Categoria</h1>
                  <input type="text" placeholder="Viejo" id="nombre" className={tema ? 'inputt-white' : 'inputt'} />
                  <input type="text" placeholder="Nuevo" id="nuevo" className={tema ? 'inputt-white' : 'inputt'} />
                  <button className="botonto" onClick={ActualizarCat}>Actualizar</button>
                </div>
              </div>
            </div>)}
          {modalOpen3 && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay-white' : 'modal-overlay'}>
                <div className="close-button" onClick={() => closeModal3()} />
                <h1 className="H1">Borrar Categoria</h1>
                <h1 className="escondido" id="H1 hidden" hidden={true}>Categoria no encontrado</h1>
                <div className="modal-content">
                  <input type="text" placeholder="Nombre" id="borrar" className={tema ? 'inputt-white' : 'inputt'} />
                  <button className="botonto" onClick={BorrarCat}>Borrar</button>
                </div>
              </div>
            </div>)}
          {modalOpen7 && (
            <div className="contenedor3">
              <div className={tema ? 'modal-overlay-white' : 'modal-overlay'}>
                <div className="close-button" onClick={() => closeModal7()} />
                <div className="modal-content">
                  <h1 className="H1">Borrar Articulo</h1>
                  <h1 className="escondido" id="H1 hidden" hidden={true}>ID invalido</h1>
                  <input type="number" placeholder="ID" id="borrar" className={tema ? 'inputt-white' : 'inputt'} onKeyPress={handleKeyPress} />
                  <button className="botonto" onClick={BorrarArticulo}>Eliminar</button>
                </div>
              </div>
            </div>)}
          <header className={tema ? 'header-white' : 'header'} id="header" >
            <input type="checkbox" id="toggleButton" class="toggle-checkbox" onClick={modo} />
            <label for="toggleButton" class="toggle-label"></label>
            <div className="absolute" onClick={openModalAyuda} />
            <div className={tema ? 'perfil-white' : 'perfil'} />
            <div className="contenedor2">
              <input
                className={tema ? 'filter-white' : 'filter'}
                type="search"
                id="filtrarArt"
                placeholder="Buscar"
                onChange={cambiosArticulo} />
              <select className={tema ? 'selec2-white' : 'selec2'} id="ordenar" onChange={() => { filtrarAZ() }} defaultValue="a">
                <option value="" selected>Ordenar</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="+/-">+/-</option>
                <option value="-/+">-/+</option>
              </select>
              <div className={tema ? 'botoncabe1-white' : 'botoncabe1'} id="botoncabe1" onClick={openModal} />
              <div className={tema ? 'botoncabe2-white' : 'botoncabe2'} id="botoncabe2" onClick={openModal7} />
              <div className={tema ? 'botoncabe3-white' : 'botoncabe3'} id="botoncabe3" onClick={openModal6} />
              <div className={tema ? 'botoncabe4-white' : 'botoncabe4'} id="botoncabe4" onClick={openModal9} />
              <div className={tema ? 'botoncabe5-white' : 'botoncabe5'} id="botoncabe5" onClick={() => { setMostrarPrestamo(!mostrarPrestamo); setMostarList(false) }} />


            </div>
          </header>
          <div className="contenedor">
            <div className={tema ? 'izquierda-white' : 'izquierda'} >
              <h1 className="h1">Categorias</h1>
              <ul className='ul' style={{ listStyle: 'none' }}>
                <li className="li" onClick={() => setMostarList(false)} >Todos</li>
                {listaCat}
              </ul>
              <div className="medioizquierda">
                {modalOpen4 && (
                  <div className={`desplegable ${modalOpen4 ? 'visible' : ''}`}>
                    <li className="li2" onClick={openModal3}>Borrar Cat</li>
                    <li className="li2" onClick={openModal5}>Editar Cat</li>
                    <li className="li2" onClick={openModal2}>Añadir Cat</li>
                  </div>)}
                <div className="btn" onClick={openModal4} />
              </div>
            </div>
            <div className="resto" id="infiniteScroll">
              <InfiniteScroll dataLength={listaArticulo.length} hasMore={true} scrollableTarget="infiniteScroll">
                <table className="table">
                  <tbody>
                    {!mostrarPrestamo && (
                      <>
                        <tr>
                          <td className="lista">Nombre</td>
                          <td className="lista">Fecha</td>
                          <td className="lista">ID</td>
                          <td className="lista">Categoria</td>
                          <td className="lista">Cantidad</td>
                          <td className="lista">Disponibles</td>
                        </tr>
                        {!mostarLista && listaArticulo}
                        {mostarLista && artFiltrado}
                      </>
                    )}
                    {mostrarPrestamo && (
                      <>
                        <tr>
                          <td className="lista2">Prestador</td>
                          <td className="lista2">Profesor</td>
                          <td className="lista2">Fecha</td>
                          <td className="lista2">Hora Dev</td>
                          <td className="lista2">Devuelto</td>
                        </tr>
                        {!mostarLista && listaPrestamos}
                        {mostarLista && artFiltrado}
                      </>
                    )}
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}
    </div>)
}
