// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
//
// function Greeting({initialName = ''}) {
//   // 🐨 initialize the state to the value from localStorage
//   // 💰 window.localStorage.getItem('name') ?? initialName
//   const [name, setName] = React.useState(
//     window.localStorage.getItem('name') || initialName,
//   )
//
//   // 🐨 Here's where you'll use `React.useEffect`.
//   // The callback should set the `name` in localStorage.
//   // 💰 window.localStorage.setItem('name', name)
//   React.useEffect(() => window.localStorage.setItem('name', name))
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }
//
// function App() {
//   return <Greeting initialName={'sOhan'} />
// }
//
// export default App
//
// //////////Lazy State Initialization/////////////
//
// function Greeting({initialName = ''}) {
//   // 🐨 initialize the state to the value from localStorage
//   // 💰 window.localStorage.getItem('name') ?? initialName
//   const getInitialName = () =>
//     window.localStorage.getItem('name') || initialName
//   const [name, setName] = React.useState(getInitialName)
//
//   // 🐨 Here's where you'll use `React.useEffect`.
//   // The callback should set the `name` in localStorage.
//   // 💰 window.localStorage.setItem('name', name)
//   React.useEffect(() => window.localStorage.setItem('name', name))
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }
//
// function App() {
//   return <Greeting initialName={'sOhan'} />
// }
//
// export default App

//////////useEffect dependency array/////////////
//
// function Greeting({initialName = ''}) {

//   const getInitialName = () =>
//     window.localStorage.getItem('name') || initialName
//   const [name, setName] = React.useState(getInitialName)
//

//   // The callback should set the `name` in localStorage.

//   React.useEffect(() => window.localStorage.setItem('name', name), [name])
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }
//
// function App() {
//   return <Greeting initialName={'sOhan'} />
// }
//
// export default App

//               custom hook                 //
//               use local storage           //
// function useLocalStorageState(key, defaultValue = '') {
//   const [state, setState] = React.useState(
//     () => window.localStorage.getItem(key) ?? defaultValue,
//   )
//
//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])
//
//   return [state, setState]
// }
//
// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState('name', initialName)
//
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }
//
// function App() {
//   return <Greeting />
// }
//
// export default App

/////////////////////////////////////////////////////////////
//                flexible local storage                   //
/////////////////////////////////////////////////////////////

function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
