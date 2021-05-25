import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { LogIn } from 'react-feather'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'
import api from '../../services/api'

function Logon () {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin (e) {
    e.preventDefault()

    try {
      const response = await api.post('sessions', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (error) {
      alert('falha no login')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="truly-hero" />

      <form onSubmit={handleLogin}>
        <h1>Faça seu logon</h1>

        <input
          placeholder="Sua ID"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <button className="button" type="submit">Entrar</button>
        <Link to="/register" className="back-link" >
          <LogIn size={16} color ={'#e02041'}/>
          Não tenho cadastro
        </Link>
      </form>
      </section>
      <img src={herosImg} alt="Heros" />
    </div>

  )
}

export default Logon
