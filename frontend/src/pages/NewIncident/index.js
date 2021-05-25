import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleNewIncident (e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (e) {
      alert('erro ao cadastrar caso, tente novamente', e)
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="truly-hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Faça seu cadastro, entre na platafroma e ajude a encontrarem os casos da sua ONG.</p>
          <Link to="/profile" className="back-link">
            <ArrowLeft />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange= {e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange= {e => setDescription(e.target.value)}
          />
          <input
            placeholder="valor em reais"
            value={value}
            onChange= {e => setValue(e.target.value)}
          />

          <button className="button" type="submit">cadastrar</button>
        </form>

      </div>
    </div>
  )
}
