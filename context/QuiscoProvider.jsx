import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuiscoContext = createContext();

const QuiscoProvider = ({ children }) => {

    const router = useRouter();

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {

        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);

        setTotal(nuevoTotal);

    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/');
    }

    const handleClickProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        if (pedido.some(p => p.id === producto.id)) {

            //Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ?
                producto : productoState)

            setPedido(pedidoActualizado);

            toast.success('Pedido Actualizado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            setPedido([
                ...pedido,
                producto
            ])

            toast.success('Agregado al Pedido', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setModal(false);

    }

    const handleEditarCantidades = id => {

        const productoActualizar = pedido.filter(producto => producto.id === id);
        setModal(true);
        setProducto(productoActualizar[0]);

    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);

        toast.success('Producto Eliminado ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const colocarOrden = async e => {
        e.preventDefault();

        try {

            const data = await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toLocaleString() });

            //Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([]);
            setNombre('');
            setTotal(0);

            toast.success('Orden Agregada ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                router.push('/');
            }, 3000);


        } catch (error) {
            console.log(error);
        }

        // console.log(pedido);
        // console.log(nombre);
        // console.log(total);
    }

    return (
        <QuiscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                producto,
                modal,
                pedido,
                nombre,
                total,
                handleClickCategoria,
                handleClickProducto,
                handleChangeModal,
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarProducto,
                setNombre,
                colocarOrden
            }}
        >
            {children}
        </QuiscoContext.Provider>
    )
}

export {
    QuiscoProvider
}

export default QuiscoContext;