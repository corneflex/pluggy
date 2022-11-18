import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import {useFederatedComponent} from "@pluggy/core";
import { PluginsList } from './plugins/PluginsList';

export function App() {
  const {Component: Plugme} = useFederatedComponent('http://localhost:3333/plugins/plugme/remoteEntry.js', 'plugme', './Module');
  return (
    <PluginsList></PluginsList>
  );
}

export default App;
