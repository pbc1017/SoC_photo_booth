import {Routes, Route} from 'react-router-dom'
import { PhotoEmpty } from 'components/PhotoEmpty'
import { NumberSelect } from 'pages/NumberSelect'
import { PhotoSelect } from 'pages/PhotoSelect'
import Home from './Home'
import { PhotoEditGrid } from 'components/PhotoEditGrid'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/photo" element = {<PhotoEditGrid numPhoto={4}/>}/>
            <Route path= "/numberselect" element = {<NumberSelect/>}/>
            <Route path= "/photoselect" element = {<PhotoSelect/>}/>
        </Routes>
    )
}