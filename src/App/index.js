import React, { Component } from 'react';
import './App.css';
import AppLayout from './AppLayout';
import Navbar from './Navbar';
import { AppProvider } from './AppProvider';
import Settings from '../Settings';
import Dashboard from '../Dashboard';
import Content from '../Shared/Content';

class App extends Component {
  render () {
    return (
      <AppLayout>
        <AppProvider>
          <Navbar />
          <Content>
            <Settings />
            <Dashboard />
          </Content>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
