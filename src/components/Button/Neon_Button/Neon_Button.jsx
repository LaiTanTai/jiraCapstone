import React from 'react'
import styles from "./Neon_Button.module.scss"
function Neon_Button({style,children}) {
  return (
    <button style={{fontSize:style }} className={styles.Neon_Button}>
      {children}
    </button>
  )
}

export default Neon_Button