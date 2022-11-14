import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import {useFederatedComponent} from "@pluggy/core";

export function App() {
  const {Component: Plugme} = useFederatedComponent('http://localhost:3333/plugins/plugme/remoteEntry.js', 'plugme', './Module');
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/plugins-plugme">PluginsPlugme</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="app-composer-client" />} />

        <Route path="/plugins-plugme" element={<Plugme />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
