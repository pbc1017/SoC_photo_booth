import {Routes, Route} from 'react-router-dom'
import { PhotoEmpty } from 'components/PhotoEmpty'
import { NumberSelect } from 'pages/NumberSelect'
import { PhotoSelect } from 'pages/PhotoSelect'
import { FrameSelect } from 'pages/FrameSelect'
import { FilterSelect } from 'pages/FilterSelect'
import { FileDownloadPage } from 'pages/FileDownloadPage'
import { Loading } from 'pages/Loading'
import { Result } from 'pages/Result'

import { Select } from 'pages/Select'

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

            <Route path= "/select" element = {<Select/>}/>
            <Route path= "/loading" element = {<Loading/>}/>
            <Route path= "/result" element = {<Result/>}/>
        </Routes>
    )
}