import React from 'react';
import './App.css';
import Navbar from './Navbar';
import AppLayout from './AppLayout';
import {AppProvider} from './AppProvider';
import Settings from '../Settings';
import Content from '../Shared/Content';

function App () {
  return (

    <AppLayout>
      <AppProvider>
        <Navbar />
        <Content>
          <Settings />
        </Content>
      </AppProvider>
    </AppLayout>

  );
}

export default App;
