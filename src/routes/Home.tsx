import {FC} from 'react'
import {Link} from 'react-router-dom'
import {Home} from '../pages/Home'

type HomeProps = {
    title? : string
}

const home: FC<HomeProps> = ({title}) => {
    return (
        <div>
            <Home/>
        </div>
    )
};

export default home;