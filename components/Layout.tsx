import React from 'react'

import Navbar from 'components/Navbar'

interface LayoutProps {
    children: JSX.Element
}
const Layout:React.FC<LayoutProps> = ({children })=>{
    return (
        <>
            <Navbar />
            <main className='container'>
                {children}
            </main>
        </>

    )
}

export default Layout