import { useState, useEffect, createContext } from "react";
import axios from "axios";

const QuiscoContext = createContext();

const QuiscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);

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

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id);
        setCategoriaActual(categoria[0]);
    }
    
    const handleClickProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {

        if(pedido.some(p => p.id === producto.id)) {

            //Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ?
            producto : productoState)

            setPedido(pedidoActualizado);

        } else {
            setPedido([
                ...pedido,
                producto
            ])
        }

        setModal(false);
       
    }

    return (
        <QuiscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                producto,
                modal,
                pedido,
                handleClickCategoria,
                handleClickProducto,
                handleChangeModal,
                handleAgregarPedido
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