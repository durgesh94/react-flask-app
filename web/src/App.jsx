import React from 'react'
import './App.css'
import { AuthProvider } from './providers/authProvider';

function App() {

  return (
    <>
      <AuthProvider>
        <div>Hello</div>
      </AuthProvider>
    </>
  )
}

export default App
