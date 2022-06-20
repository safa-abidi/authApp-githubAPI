import React from 'react';
import {AuthProvider} from './context/AuthContext';
import Nav from './navigation/Nav';

export default function App() {
  return (
    <AuthProvider>
      <Nav />
    </AuthProvider>
  );
}
