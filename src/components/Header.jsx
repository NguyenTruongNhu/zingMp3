import React from 'react'
import icons from '../utils/icons'
import Search from './Search'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } = icons
const Header = () => {
    const navigate = useNavigate()
    const { singer } = useParams()

    return (
        <div className="flex  justify-between w-full">
            <div className="flex gap-6 w-full  items-center">
                <div className="flex gap-6 cursor-pointer">
                    <span onClick={() => navigate(-1)}>
                        <HiOutlineArrowSmLeft size={24} color={singer ? 'gray' : 'black'} />
                    </span>
                    <span onClick={() => navigate(1)}>
                        <HiOutlineArrowSmRight size={24} color={singer ? 'gray' : 'black'} />
                    </span>
                </div>
                <div className="w-1/2">
                    <Search />
                </div>
            </div>
            <div>Login</div>
        </div>
    )
}

export default Header
