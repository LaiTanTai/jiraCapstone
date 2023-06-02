import React, { Suspense ,lazy } from 'react';
import {Route,Routes,BrowserRouter} from "react-router-dom"
import Loader from './components/Loader/Loader'
const Firstpage = lazy(()=>import("./components/FirstPage/FirstPage"));
function App() {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Firstpage/>}/>
          <Route path='/Home'>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
