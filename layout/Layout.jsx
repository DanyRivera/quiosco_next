import Head from 'next/head';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import ModalProducto from '../components/ModalProducto';
import Pasos from '../components/Pasos';
import useQuiosco from '../hooks/useQuiosco';

import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#__next');

const Layout = ({ children, pagina }) => {

    const {modal} = useQuiosco();

    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Caféteria" />
            </Head>

            <div className='md:flex'>

                <aside className='md:w-3/12'>
                    <Sidebar />
                </aside>

                <main className='md:w-10/12 h-screen overflow-y-scroll'>
                    <div className='p-10'>
                        <Pasos />
                        {children}
                    </div>
                </main>

            </div>

            {modal && (
                <Modal
                    isOpen={modal}
                    style={customStyles}
                >
                    <ModalProducto />
                </Modal>
            )}

            <ToastContainer />

        </>
    )
}

export default Layout;