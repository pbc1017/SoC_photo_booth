import {Routes, Route} from 'react-router-dom'
import { PhotoEmpty } from 'components/PhotoEmpty'
import { NumberSelect } from 'pages/NumberSelect'
import { PhotoSelect } from 'pages/PhotoSelect'
import { FrameSelect } from 'pages/FrameSelect'
import { FilterSelect } from 'pages/FilterSelect'
import { FileDownloadPage } from 'pages/FileDownloadPage'
import Home from './Home'
import { PhotoEditGrid } from 'components/PhotoEditGrid'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            

            <Route path= "/numberselect" element = {<NumberSelect/>}/>
            <Route path= "/photoselect" element = {<PhotoSelect/>}/>
            <Route path= "/frameselect" element = {<FrameSelect/>}/>
            <Route path= "/filterselect" element = {<FilterSelect/>}/>
            <Route path= "/filedownload" element = {<FileDownloadPage/>}/>
            
        </Routes>
    )
}