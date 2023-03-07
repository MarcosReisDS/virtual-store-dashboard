import { FC } from 'react';
import './App.css';
import Router from './shared/router';

interface IApp { }
const App: FC<IApp> = () => {
  return (
    <Router />
  )
}

export default App;
