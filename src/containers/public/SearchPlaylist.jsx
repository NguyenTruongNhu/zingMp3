import React, { useEffect, useState } from 'react'
import { apiGetArtist } from '../../apis'
import { useSelector } from 'react-redux'
import { SectionItem } from '../../components'
import { play } from '../../store/actions'

const SearchPlaylist = () => {
    const { searchData } = useSelector((state) => state.music)
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetArtist(searchData?.top?.alias)
            if (res.data.err === 0) {
                setPlaylists(res.data.data.sections[1])
            }
        }
        fetch()
    }, [searchData])

    return (
        <div className="w-full  flex flex-col gap-8 px-[43px]">
            <h3 className="text-[20px] font-bold ">Playlist/Album</h3>
            <div className="flex items-start flex-wrap justify-between ">
                {playlists &&
                    playlists?.items?.length > 0 &&
                    playlists.items?.map((item) => (
                        <SectionItem
                            title={item.title}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            thumbnailM={item.thumbnailM}
                            key={item.encodeId}
                        />
                    ))}
            </div>
        </div>
    )
}

export default SearchPlaylist
