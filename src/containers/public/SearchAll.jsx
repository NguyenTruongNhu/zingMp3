import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../utils/fn'
import { SongItem, List, SectionItem, Artist } from '../../components'

const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music)
    return (
        <div className="w-full flex flex-col px-[59px] gap-[60px]">
            <div>
                <h3 className="text-lg font-bold mb-5">Nổi bật</h3>
                <div className="flex gap-8 cursor-pointer">
                    {searchData?.top && (
                        <div className="p-[10px] flex-1 bg-main-200 rounded-md flex gap-6 items-center">
                            <img
                                src={searchData.top.thumbnail}
                                alt="avatar"
                                className={`w-[84px] h-[84px] object-cover ${
                                    searchData.top.objectType === 'artist' && 'rounded-full'
                                }`}
                            />
                            <div className="flex flex-col text-xs">
                                <span className="mb-[6px]">
                                    {searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}
                                </span>
                                <span className="text-sm font-semibold">
                                    {searchData.top.title || searchData.top.name}
                                </span>
                                {searchData.top.objectType === 'artist' && (
                                    <span>{handleNumber(searchData.artists[0]?.totalFollow) + ' quan tâm'}</span>
                                )}
                            </div>
                        </div>
                    )}
                    {searchData?.songs
                        ?.filter((item, index) => [...Array(2).keys()].some((i) => i === index))
                        ?.map((item) => (
                            <div key={item.encodeId} className="flex-1">
                                <SongItem
                                    thumbnail={item.thumbnail}
                                    sid={item.encodeId}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    size="w-[84px] h-[84px]"
                                    style="bg-main-200"
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col w-full">
                <h3 className="text-lg font-bold mb-5">Bài hát</h3>
                <div className="flex justify-between flex-wrap w-full">
                    {searchData?.songs?.map((item, index) => (
                        <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`}>
                            <List songData={item} isHideAlbum isHideNode={true} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full">
                <h3 className="text-lg font-bold mb-5">Playlist/Album</h3>
                <div className="flex items-start justify-between gap-[28px]">
                    {searchData?.playlists
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
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
            <div className="flex flex-col w-full">
                <h3 className="text-lg font-bold mb-5">Nghệ sĩ </h3>
                <div className="flex  gap-[28px]">
                    {searchData?.artists
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <Artist
                                key={item.id}
                                title={item.name}
                                image={item.thumbnailM}
                                follower={item.totalFollow}
                                link={item.link}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default SearchAll
