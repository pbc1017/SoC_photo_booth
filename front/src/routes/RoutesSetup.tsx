import {Routes, Route} from 'react-router-dom'
// import {Login} from '/pages/Login/'
import Home from './Home'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            {/* <Route path= "/login" element = {<Login/>}/> */}
        </Routes>
    )
}