import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { Player, SidebarLeft, SidebarRight, Header, Loading } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
const Public = () => {
    const [isShowRightSideBar, setIsShowRightSideBar] = useState(true)
    const { isLoading, scrollTop } = useSelector((state) => state.app)
    const { curSongId } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const handleScrollTop = (e) => {
        if (e.target.scrollTop === 0) {
            dispatch(actions.zeroScrollTop(true))
        } else {
            dispatch(actions.zeroScrollTop(false))
        }
    }
    return (
        <div className="w-full relative h-screen flex flex-col  bg-main-300">
            <div className="w-full h-full flex flex-auto ">
                <div className="min-[1024px]:w-[240px] w-[70px] h-full flex-none ">
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col  ">
                    {isLoading && (
                        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-200 flex items-center justify-center">
                            <Loading />
                        </div>
                    )}

                    <div
                        className={`h-[70px] ${
                            scrollTop ? 'bg-transparent' : 'bg-main-300'
                        } fixed top-0 min-[1024px]:left-[240px] left-[70px]  ${
                            isShowRightSideBar ? 'res1200:right-[300px]  right-0' : 'l right-0'
                        } z-50 px-[59px] flex items-center`}
                    >
                        <Header />
                    </div>

                    <div className="flex-auto w-full">
                        <Scrollbars onScroll={handleScrollTop} autoHide style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                            <div className="w-full h-[120px]"></div>
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSideBar && (
                    <div className="w-[300px] hidden res1200:flex absolute right-0 bg-[#ced9d9] shadow-md z-50 h-screen  flex-none animate-slide-left">
                        <SidebarRight />
                    </div>
                )}
            </div>

            {curSongId && (
                <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
                    <Player setIsShowRightSideBar={setIsShowRightSideBar} />
                </div>
            )}
        </div>
    )
}

export default Public
