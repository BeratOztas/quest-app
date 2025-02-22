import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './components/Post/Post'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'

function App() {

  return (
    <>
      <PageContainer>
        <Header/>
        <RouterConfig/>
        <Loading/>
      </PageContainer>
    </>
  )
}

export default App
