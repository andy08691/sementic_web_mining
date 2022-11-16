import React, { useState } from 'react'

import Toast from 'react-bootstrap/Toast'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import './style.css'

const PREFIX_URL = 'http://localhost:8983/solr/healthcare/'
const FAKE = {
  responseHeader: {
    status: 0,
    QTime: 1,
    params: {
      q: 'question_text:covid question_title:covid',
      indent: 'true',
      'q.op': 'OR',
    },
  },
  response: {
    numFound: 943,
    start: 0,
    numFoundExact: true,
    docs: [
      {
        source:
          'https://www.medhelp.org/posts/COVID19/COVID-Testing-Advice/show/3067941',
        question_title: 'COVID Testing Advice',
        question_text:
          'I recently tested negative for Covid. Should I continue to monitor myself for symptoms and go back for additional test later? Additionally, should I be worried about potential exposure to covid at the doctor’s office while getting tested for covid?',
        postDate: 1637252452,
        responseCount: '4',
        responseAuthor: 'N/A',
        id: '803',
        _version_: 1748968536122851332,
      },
      {
        source: 'https://patient.info/forums/discuss/covid-739159',
        question_title: 'Covid',
        responseCount: '0',
        postDate: 1591426800,
        question_text:
          'Wish this covid - 19 would just go now and not come back 😖😖😖😖😖😖',
        id: '1378',
        _version_: 1748968536236097538,
      },
      {
        source:
          'https://patient.info/forums/discuss/medical-industry-covid-753918',
        question_title: 'Medical Industry / Covid',
        responseCount: '0',
        postDate: 1611212400,
        question_text:
          'I am totally exhausted , my 21 year old son was hospitalized for a week with a blood clot on his leg.  We spoke with over 10 doctors as to why he got a blood clotAll of them said it was due to Covid.   If coded as Covid, our insurance company waives those charges10 Dr,all saying Covid, bills sat DVT and we must pay.',
        id: '1216',
        _version_: 1748968536210931716,
      },
      {
        source: 'https://forums.livescience.com/threads/long-covid.6212/',
        question_title: 'Long Covid.',
        question_text:
          "Found this article with links to further information of interest and wanted to share with you.  ' The infection may also alter how people's organs function. This is most obvious with the lungs if they become scarred - long-term problems have been seen after infection with Sars or Mers, which are both types of coronavirus. But Covid may also alter people's metabolism. There have been cases of people struggling to control their blood sugar levels after developing diabetes as a result of Covid, and Sars led to changes in the way the body processed fats for at least 12 years. There are early signs of changes to brain structure, but these are still being investigated. And Covid-19 also does strange things to the blood, including abnormal clotting, and damaging the network of tubes that carry blood around the body.'   'Long Covid': Why are some people not recovering? Why is coronavirus leaving some people with long-term health problems including fatigue? www.bbc.com  ",
        responseCount: '13',
        postDate: 1627368126,
        id: '91',
        _version_: 1748968535943544832,
      },
      {
        source:
          'https://patient.info/forums/discuss/covid-self-isolation-767459',
        question_title: 'covid self isolation',
        responseCount: '1',
        postDate: 1627369200,
        question_text:
          'hi can somone clarify hi my son has just recovered from covid and is due to end selfisolation i have know devloped covid does he know have to isolate again any help greatlly appreciated ',
        id: '1073',
        _version_: 1748968536180523010,
      },
      {
        source: 'https://forums.livescience.com/threads/covid-19.2010/',
        question_title: 'covid-19',
        question_text: 'what are the causes of death for victims of covid-19  ',
        responseCount: '1',
        postDate: 1586809505,
        id: '192',
        _version_: 1748968535997022210,
      },
      {
        source: 'https://patient.info/forums/discuss/covid-induced-ed--782838',
        question_title: 'Covid induced ED?',
        responseCount: '0',
        postDate: 1649833200,
        question_text:
          "Hi! I'm a 21 year old man, relatively healthy. As of yesterday I was diagnosed with Covid.  Before this, I had no issue getting or holding erections. But after my diagnosis, it's like no matter what I do, I cannot get hard. I did some research and found that ED can be a side effect of Covid, but this early on, that fast? Every article talks about how it's generally something that's a result of long covid. I can't find any articles saying if this is permanent, or if this is something that will subside as my symptoms begin to go away, or if this is just a symptom due to Covid and not a form of Covid induced ED. Any help or advice or anything would really be appreciated as I am currently really worried. 21 and having ED doesn't sound fun, especially when I'm fully vaccinated and have the booster shot too. ",
        id: '942',
        _version_: 1748968536155357185,
      },
      {
        source: 'https://patient.info/forums/discuss/covid-752791',
        question_title: 'Covid',
        responseCount: '4',
        postDate: 1610694000,
        question_text:
          'i tested positive for covid on january 1rst..great way to start the new year might i add.only symptoms i have is slight loss of smell and taste..am i going to get worse?',
        id: '1231',
        _version_: 1748968536215126017,
      },
      {
        source:
          'https://patient.info/forums/discuss/suffering-with-long-covid-758601',
        question_title: 'Suffering with Long Covid',
        responseCount: '1',
        postDate: 1623308400,
        question_text:
          'Over the past few months I have been suffering with most if not all of the typical long covid symptoms.  I just had a telephone conversation with a doctor who has told me that because I was not tested for covid19 and found to be infected and because I was not tested for covid antibodies before I received my first vaccination injection that I cannot be considered to be a long covid sufferer and therefore would not be accepted by a long covid clinic.  Is this correct ?',
        id: '1111',
        _version_: 1748968536187863043,
      },
      {
        source:
          'https://patient.info/forums/discuss/coronavirus-covid-19--758963',
        question_title: 'Coronavirus (covid-19)',
        responseCount: '0',
        postDate: 1617174000,
        question_text:
          'I had covid back in November, I got my first moderna vaccine 3 weeks ago, I got very sick, I am due for my 2nd dose in 2 days. Has anyone who had covid and got vaccine can relate their experience with both shots? ',
        id: '1160',
        _version_: 1748968536199397377,
      },
    ],
  },
}

const Run = () => {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const getDataFromApi = async () => {
    // get data from server
    // let url =
    //   PREFIX_URL +
    //   'select?indent=true&q.op=OR&q=question_text%3A' +
    //   searchText +
    //   '%20question_title%3A' +
    //   searchText
    // console.log('getDataFromApi', url)
    // const response = await fetch(url, {
    //   Method: 'GET',
    //   Headers: {
    //     Accept: 'application.json',
    //     'Content-Type': 'application/json',
    //   },
    //   Cache: 'default',
    // })
    // if (response) {
    //   const result = await response.json()
    //   if (result['response']['docs'].length >= 0) {
    //     setData(result['response']['docs'])
    //   }
    // }

    // for fake data
    setData(FAKE.response.docs)
  }
  const generateTable = () => {
    if (data.length <= 0) {
      return
    }
    data.sort(function (a, b) {
      return b['postDate'] - a['postDate']
    })
    return data.map((d, index) => (
      <tr key={index} id={index}>
        <th scope='row'>{index + 1}</th>
        <td>{d.question_title}</td>
        <td>{new Date(d.postDate * 1000).toISOString().split('T')[0]}</td>
        <td>{d.question_text}</td>
        <td>
          <button
            type='button'
            class='btn btn-danger btn-sm'
            onClick={() => {
              window.open(d.source, '_blank')
            }}
          >
            GO
          </button>
        </td>
      </tr>
    ))
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      getDataFromApi()
    }
  }

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
                        className='nav-link'
                        aria-current='page'
                        onClick={() => {
                          navigate('/')
                        }}
                      >
                        Home
                      </div>
                    </li>
                    <li className='nav-item'>
                      <div
                        className='nav-link active'
                        onClick={() => {
                          navigate('/run')
                        }}
                      >
                        Run
                      </div>
                    </li>
                    <li>
                      <div className='col-md-12'>
                        <h1 style={{ color: '#A0A0A0' }}>
                          CSE573 Semantic Web Mining Final Project
                        </h1>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <section id='search'>
          <div className='container'>
            <div class='input-group mb-3'>
              <input
                id='keywords'
                type='text'
                class='form-control'
                placeholder='keywords'
                onChange={(event) => {
                  setSearchText(event.target.value)
                }}
                onKeyPress={handleKeypress}
              />
              <button
                class='btn btn-outline-secondary'
                type='button'
                id='button_search'
                onClick={() => {
                  getDataFromApi()
                }}
              >
                Search
              </button>
            </div>
          </div>
          <table class='table' style={{ width: '90%', marginLeft: '5%' }}>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Date</th>
                <th scope='col'>Content</th>
                <th scope='col'>Link</th>
              </tr>
            </thead>
            <tbody>{generateTable()}</tbody>
          </table>
        </section>
      </body>
    </html>
  )
}

export default Run
