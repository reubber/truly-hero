import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

function Register () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory()

  async function handleRegister (e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const response = await api.post('ongs', data)
      alert(`seu id de acesso: ${response.data.id}`)
      history.push('/')
    } catch (e) {
      alert('erro no cadastro de cliente', e)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="truly-hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua Ong</p>
          <Link to="/" className="back-link">
            <ArrowLeft />
            Já possuo cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="whatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">cadastrar</button>
        </form>

      </div>
    </div>
  )
}

export default Register
