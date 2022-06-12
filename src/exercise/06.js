// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

//
// import {
//   PokemonInfoFallback,
//   PokemonForm,
//   PokemonDataView,
//   fetchPokemon,
//   PokemonErrorBoundary,
// } from '../pokemon'
//
// function PokemonInfo({pokemonName}) {
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)
//
//   React.useEffect(() => {
//     if (!pokemonName) return
//     setPokemon(null)
//     setError(null)
//     fetchPokemon(pokemonName).then(
//       pokemon => setPokemon(pokemon),
//       error => setError(error),
//     )
//   }, [pokemonName])
//   if (error) {
//     return (
//       <div role="alert">
//         There was an error:
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (!pokemonName) {
//     return 'Submit a pokemon'
//   } else if (!pokemon) {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else {
//     return <PokemonDataView pokemon={pokemon} />
//   }
// }
//
// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')
//
//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }
//
//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }
//
// export default App


//
// function PokemonInfo({pokemonName}) {
//   const [status, setStatus] = React.useState('idle')
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)
//
//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setStatus('pending')
//     fetchPokemon(pokemonName).then(
//       pokemon => {
//         setPokemon(pokemon)
//         setStatus('resolved')
//       },
//       error => {
//         setError(error)
//         setStatus('rejected')
//       },
//     )
//   }, [pokemonName])
//
//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     return (
//       <div>
//         There was an error:{' '}
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }
//
//   throw new Error('This should be impossible')
// }
//
// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')
//
//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }
//
//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }
//
// export default App

//
// //extra three
// function PokemonInfo({pokemonName}) {
//   // let a={
//   //   name: "chaudhuree",
//   //   age:14
//   // }
//   // console.log({a})
//   // let b ={...a,name:"sOhan"}
//   // console.log({b})
//   const [state, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })
//   const {status, pokemon, error} = state
//
//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => {
//         setState({...state,status: 'resolved', pokemon})
//         console.log(state)
//       },
//       error => {
//         setState({status: 'rejected', error})
//       },
//     )
//   }, [pokemonName])
//
//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     return (
//       <div>
//         There was an error:
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }
//
//   throw new Error('This should be impossible')
// }
//
// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')
//
//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }
//
//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }
//
// export default App


//error boundary


class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    // this will be handled by an error boundary
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
