import React from 'react'

// eslint-disable-next-line react/prop-types
function Header ({ title, children }) {
  return (
    <div>
      <h1> { title } </h1>
      <p> {children}</p>
    </div>
  )
}

export default Header
