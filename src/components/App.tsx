import React, { useState, useEffect } from 'react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import EntryModal from './EntryModal'

import { DataFile, getCurrentData, Entry } from '../utils/utils'

export default function App() {
  const [data, setData] = useState<DataFile>(),
    [displayedEntry, displayEntry] = useState<Entry>(),
    [displayedEpisode, displayEpisode] = useState<number>(),
    [tab, setTab] = useState<string | null>('entries')

  useEffect(() => {
    getCurrentData().then(setData)
  }, [data])

  return (
    <div>
      {
        data
          ? (
            <div>
              <Tabs
                id="main tab menu"
                activeKey={tab}
                onSelect={t => {
                  if (displayedEntry) displayEntry(undefined)
                  if (displayedEpisode) displayEpisode(undefined)
                  setTab(t)
                }}
              >
                <Tab
                  eventKey="entries"
                  title={'"""Definizioni"""'}
                >
                  <ListGroup>
                    {data.entries.map(e => (
                      <ListGroupItem action onClick={() => displayEntry(e)} key={e.word + e.source.id}>
                        <b>{e.word}</b>: {e.def}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <EntryModal entry={displayedEntry} handleClose={() => { displayEntry(undefined) }} />
                </Tab>
                <Tab
                  eventKey="episodes"
                  title="Puntate"
                >
                  <ListGroup>
                    {
                      data.entries
                        .map(e => e.source)
                        .reduce((arr, curr) => arr.find(e => e.id === curr.id) ? arr : [...arr, curr], [] as Entry['source'][])
                        .map(e => (
                          <ListGroupItem action onClick={() => displayEpisode(e.id)} key={e.id}>
                            {e.title}
                          </ListGroupItem>
                        ))
                    }
                  </ListGroup>
                </Tab>
                <Tab
                  eventKey="search"
                  title="Ricerca"
                >
                  asd
              </Tab>
              </Tabs>
            </div>
          )
          : 'Loading...'
      }
    </div>
  )
}