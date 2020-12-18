import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'
import axios from 'axios'
import { FilteredListHelper, useHook } from './filterListHelper.jsx'
import './app.scss'

let App = () => {
  const [unChangedBreedList, setUnChangedBreedList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [final, setFinal] = useState()
  const [pureBreedsT, allBreedsT, crossBreedsT, nonLiveT] = useHook()
  const [showModal, setShowModal] = useState(false)
  const [breedTabs, setBreedTabs] = useState([
    'All',
    'Purebreed',
    'Crossbreed',
    'Not Live',
  ])

  useEffect(() => {
    setFinal(allBreedsT)
    console.log('useeffect', allBreedsT)
  })

  let handleTabClick = (index) => {
    console.log('hey', index)
    let final = [
      index === 1
        ? pureBreedsT
        : index === 2
        ? crossBreedsT
        : index === 3
        ? nonLiveT
        : allBreedsT,
    ]
    setFinal(final[0])
  }

  let handleOnChange = (event) => {
    let word = event.target.value
    setInputValue(word)
  }

  console.log('final bryan ', final)
  return (
    <section className='app-component'>
      <p>
        I have <strong>{final?.length}</strong> breeds ready to be searched!
      </p>
      <input
        onClick={() => setShowModal(!showModal)}
        className='app-component__search-input'
        onChange={() => handleOnChange(event)}
        name='input'
        placeholder='Enter a breed, e.g. "Havanese"'
      />
      {showModal && (
        <article className='app-component__modal-container'>
          <div>
            {breedTabs.map((tab, tabIndex) => (
              <button
                key={tabIndex.toString()}
                name='buttons'
                className='app-component__tab-buttons'
                onClick={() => handleTabClick(tabIndex)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className='app-component__list-container'>
            <FilteredListHelper breeds={final} inputValue={inputValue} />
          </div>
        </article>
      )}
    </section>
  )
}

export default App
