import React from 'react'
import './App.css'
import { AuthProvider } from './providers/authProvider';
import { AppRoutes } from './routes';

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
