import React from 'react'
import logo from '../assets/logo.svg'
import { sidebarMenu } from '../utils/menu'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'

const notActicveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex items-center gap-[12px]'
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex items-center gap-[12px]'
const SidebarLeft = () => {
    const navigate = useNavigate()
    return (
        <div className="flex h-full flex-col bg-main-200">
            <div
                onClick={() => navigate(path.HOME)}
                className="w-full h-[70px] min-[1024px]:py-[15px] min-[1024px]:px-[25px] flex items-center justify-start cursor-pointer"
            >
                <img src={logo} alt="logo" className="w-[120px] h-10 min-[1024px]:block hidden" />
                <img
                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.63/static/media/icon_zing_mp3_60.f6b51045.svg"
                    alt="logo"
                    className="w-[95px] h-[45px] min-[1024px]:hidden"
                />
            </div>
            <div className="flex flex-col">
                {sidebarMenu.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.path}
                        end={item.end}
                        className={({ isActive }) => (isActive ? activeStyle : notActicveStyle)}
                    >
                        {item.icons}
                        <span className="min-[1024px]:inline hidden">{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft
