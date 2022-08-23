import React from 'react'

import Link from 'next/link'

import styles from 'styles/Navbar.module.css'

interface NavbarProps {
    
}
const Navbar:React.FC<NavbarProps> = ({ })=>{
    return (
        <div className={styles.navbar}>
            <Link href="/" className={styles.navbar_home}>Pollster</Link>
            <button>Menu</button>
        </div>

    )
}

export default Navbar