import React, { memo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../utils/icons'

const { AiOutlineHeart, AiFillHeart, BsFillPlayFill, BsThreeDots } = icons

const SectionItem = ({ link, title, thumbnailM, artistsNames, sortDescription, data }) => {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()

    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList?.remove('animate-scale-down-image')
        imageRef.current.classList?.add('animate-scale-up-image')
    }
    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList?.remove('animate-scale-up-image')
        imageRef.current.classList?.add('animate-scale-down-image')
    }

    return (
        <div
            onClick={() => {
                navigate(link.split('.')[0], { state: { playAlbum: false } })
            }}
            className="flex flex-col gap-3 justify-start  flex-1 p-4 text-sm cursor-pointer"
        >
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className="w-full relative overflow-hidden rounded-lg"
            >
                {isHover && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-40 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-3">
                        <span>
                            <AiOutlineHeart size={20} />
                        </span>
                        <span
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(link.split('.')[0], { state: { playAlbum: true } })
                            }}
                            className="p-1 border border-white rounded-full"
                        >
                            <BsFillPlayFill size={30} />
                        </span>
                        <span>
                            <BsThreeDots size={20} />
                        </span>
                    </div>
                )}
                <img ref={imageRef} src={thumbnailM} alt="thumbnailM" className="w-full h-auto rounded-lg " />
            </div>
            <span className="flex flex-col ">
                <span className="font-semibold">{title?.length > 30 ? title.slice(0, 30) + '...' : title}</span>
                {data?.sectionId === 'h100' ? (
                    <span>{artistsNames}</span>
                ) : (
                    <span>{sortDescription?.length >= 40 ? `${sortDescription?.slice(0, 30)}...` : artistsNames}</span>
                )}
            </span>
        </div>
    )
}

export default memo(SectionItem)
