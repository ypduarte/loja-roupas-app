import React from 'react';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  );
}
