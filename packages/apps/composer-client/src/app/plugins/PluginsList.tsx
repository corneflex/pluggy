import { useGetPluginsQuery } from "./services/plugin";

import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {useFederatedComponent} from "@pluggy/core";



export const PluginsList = () => {
    const { data: plugins, error, isLoading } = useGetPluginsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error</div>;
    }
  return (
    <React.Suspense fallback={null}>
            <header style={{display:'inline-block'}}>
            <div>
                {plugins?.map((plugin,index) => (
                    <li key={index}>
                        <Link to={plugin}>{plugin}</Link>
                    </li>
                ))}
            </div>
            </header>
            <Routes>
               {plugins?.map((plugin,index) => (
                    <Route path={plugin} element={<Component name={plugin} />} />
                ))}
            </Routes>

    </React.Suspense>
  );
}


export const Component = (props:any) => {
    const {Component: DynComponent} = useFederatedComponent(`http://localhost:3333/plugins/${props.name}/remoteEntry.js`, 'plugme', './Module');
    return DynComponent && <DynComponent/>;
};
