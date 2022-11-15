import React, { useState } from 'react'

import Toast from 'react-bootstrap/Toast'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'

import './App.css'
import './style.css'

const App = () => {
  const navigate = useNavigate()
  return (
    <html>
      <head>
        <title>CSE573 Semantic Web Mining Final Project</title>
      </head>

      <body>
        <header>
          <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <div className='container-fluid'>
                <div
                  className='collapse navbar-collapse'
                  id='navbarSupportedContent'
                >
                  <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                      <div
                        className='nav-link active'
                        aria-current='page'
                        onClick={() => {
                          navigate('./')
                        }}
                      >
                        Home
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div
                        className='nav-link'
                        onClick={() => {
                          navigate('./run')
                        }}
                      >
                        Run
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <section id='intro'>
          <div className='jumbotron'>
            <div className='container'>
              <div className='col-md-12'>
                <h1>CSE573 Semantic Web Mining Final Project</h1>
                <h2>HEALTHCARE MINING - GROUP 3</h2>
                <h3 style={{ marginTop: '50px' }}>Abstract</h3>
                <p>
                  Coronavirus disease (COVID-19) is an infectious disease and
                  became a global pandemic from 2019 Dec. Most people infected
                  with the virus will experience respiratory illness. However,
                  some will become seriously ill or even die. The older people
                  have a higher possibility to cause cardiovascular disease,
                  diabetes, chronic respiratory disease, or cancer are more
                  likely to develop serious illness. Although It has been two
                  years, we have some reference to know it deeper. There are
                  some health related websites and forums. People can look up or
                  ask questions in these forums. In this project, we want to
                  collect the information from all the related websites, and
                  then construct a model to provide relevant information to the
                  users based on their symptoms. The users can search their
                  symptoms on our application. It will show the related posts to
                  let the users more understanding about how to react to the
                  COVID-19.
                </p>
                <h3 style={{ marginTop: '50px' }}>Team Member</h3>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Studnet Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Shawn Karunanayake</td>
                      <td>1215755788</td>
                    </tr>
                    <tr>
                      <td>Jason Jimenez</td>
                      <td>1215972966</td>
                    </tr>
                    <tr>
                      <td>Yi-An Chen</td>
                      <td>1219723505</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}

export default App
