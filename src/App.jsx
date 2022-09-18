import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Join from './components/Join'
import Chat from './components/Chat'

const App = ()=>{
    <BrowserRouter>
        <Routes>
            <Route path='/' exact component ={Join}/>
            <Route path='/chat' component ={Chat}/>

        </Routes>
    </BrowserRouter>
}

export default App;