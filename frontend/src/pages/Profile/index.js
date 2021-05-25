import React, { useState, useEffect } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { Power, Trash2 } from 'react-feather'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

function Profile () {
  const [incidents, setIncidents] = useState([])

  const history = useHistory()

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  async function handleDeleteIncident (id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('erro ao deletar caso, tente novamente', error)
    }
  }

  function handleLogout () {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Truly Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <Power size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso: </strong>
            <p>{incident.title}</p>

            <strong>Descrição</strong>
            <p>{incident.description}</p>

            <strong>Valor</strong>
            <p>{Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick= {() => handleDeleteIncident(incident.id)} type="button">
              <Trash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
