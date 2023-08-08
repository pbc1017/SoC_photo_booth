import {Routes, Route} from 'react-router-dom'
// import {Login} from '/pages/Login/'
import { PhotoEmpty } from 'components/PhotoEmpty'
import Home from './Home'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/photo" element = {<PhotoEmpty/>}/>
            {/* <Route path= "/login" element = {<Login/>}/> */}
        </Routes>
    )
}