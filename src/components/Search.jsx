import React, { useState } from 'react'
import icons from '../utils/icons'
import { useNavigate, createSearchParams, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import path from '../utils/path'
import { GrClose } from 'react-icons/gr'

const { FiSearch } = icons
const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { singer } = useParams()

    const [keyword, setKeyword] = useState('')

    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword))
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            })
        }
    }

    return (
        <div className="w-full flex relative items-center">
            {keyword && (
                <span onClick={() => setKeyword('')} className="absolute right-[16px] cursor-pointer">
                    <GrClose />
                </span>
            )}
            <span
                className={`h-10 pl-4 ${
                    singer ? 'bg-[rgba(0,0,0,0.2)] text-gray-200' : 'bg-[#DDE4E4]'
                } flex items-center justify-center rounded-l-[20px] text-gray-500`}
            >
                <FiSearch size={24} />
            </span>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
                className={`outline-none ${
                    singer ? 'bg-[rgba(0,0,0,0.2)] placeholder:text-gray-200' : 'bg-[#DDE4E4]'
                } px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500`}
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            />
        </div>
    )
}

export default Search
