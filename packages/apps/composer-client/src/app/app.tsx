import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import {useFederatedComponent} from "@pluggy/core";
import { PluginsList } from './plugins/PluginsList';

export function App() {
  const {Component: Plugme} = useFederatedComponent('http://localhost:9000/remoteEntry.js', 'pluggy', './Module');
  return (
    <React.Suspense fallback="Loading Widget...">
      {Plugme && <Plugme />}
    </React.Suspense>
  );
}

export default App;
