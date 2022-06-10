import Head from 'next/head'

const Layout = ({ children, pagina }) => {
    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Caféteria" />
            </Head>

            <div className='md:flex'>

                <aside className='md:w-4/12 xl:1/4 2xl:1/5'>
                    <h1>SideBar</h1>
                </aside>

                <main className='md:w-8/12 xl:3/4 2xl:4/5 h-screen overflow-y-scroll'>
                    {children}
                </main>

            </div>

        </>
    )
}

export default Layout;