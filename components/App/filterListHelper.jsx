import React, { useState } from 'react'

export const FilteredListHelper = ({ breeds, inputValue }) => {
  console.log('helper breeds', inputValue)
  return (
    <>
      {breeds?.map((a, b) => {
        return <li key={`a${b}`}>{a.name}</li>
      })}
    </>
  )
}

export const useHook = () => {
  const [allBreedsT, setAllBreedsT] = useState([])
  const [pureBreedsT, setPureBreeds] = useState([])
  const [crossBreedsT, setCrossBreeds] = useState([])
  const [nonLiveT, setNonLive] = useState([])

  React.useEffect(() => {
    let fetchData = async () => {
      const response = await fetch('/api/breeds')
      const data = await response.json()
      console.log('getData', data)

      let updateTwo = [...data]
      console.log('updatetwo', updateTwo)
      const pureBreeds = updateTwo?.filter(
        (breed) => breed.hybrid === false && breed.live === false
      )
      let updateThree = [...data]
      const crossBreeds = updateThree?.filter(
        (breed) => breed.hybrid === true && breed.live === false
      )

      let allDogs = [...data]
      let updateOne = [...data]
      const nonLive = updateOne?.filter((breed) => breed.live === false)
      setAllBreedsT(allDogs)
      setPureBreeds(pureBreeds)
      setCrossBreeds(crossBreeds)
      setNonLive(nonLive)
    }
    fetchData()
    // console.log('allbreed', allBreedsT)
    // console.log('purebreed', allBreeds)
  }, [])
  return [allBreedsT, pureBreedsT, crossBreedsT, nonLiveT]
}
// export const FilteredListHelper = ({ breeds, inputValue }) =>
//   console.log('hey', breeds) || (
//     <>
//       {breeds
//         .filter((a) => {
//           return a.name.toLowerCase().includes(inputValue)
//         })
//         .map((b, c) => {
//           return (
//             <li name='item' className='app-component__breed-item' key={c}>
//               <img
//                 alt=''
//                 className='app-component__breed-image'
//                 src={breeds.url}
//               />
//               {b.name}
//             </li>
//           )
//         })}
//     </>
//   )
