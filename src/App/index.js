import React from 'react';
import './App.css';
import Navbar from './Navbar'
import AppLayout from './AppLayout'
import AppProvider from './AppProvider'
import Settings from '../Settings'

function App() {
  return (

    <AppLayout>
      <AppProvider>
        <Navbar/>
        <Settings />
      </AppProvider>
    </AppLayout>

  );
}

export default App;
