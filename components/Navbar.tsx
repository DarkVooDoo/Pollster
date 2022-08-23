import React from 'react'

import styles from 'styles/Navbar.module.css'

interface NavbarProps {
    
}
const Navbar:React.FC<NavbarProps> = ({ })=>{
    return (
        <div className={styles.navbar}>
            <h1>Pollster</h1>
            <button>Menu</button>
        </div>

    )
}

export default Navbar