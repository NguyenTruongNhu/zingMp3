import React from 'react'
import { Slider, Section, NewRelease, ChartSection } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Sliders from 'react-slick'
import { Loading } from '../../components'
const Home = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
    }
    const { chill, loveLife, top100, remixDance, badMood, artistTrending, albumHot, weekChart, bxhNhacNew } =
        useSelector((state) => state.app)
    return (
        <>
            {chill &&
            loveLife &&
            top100 &&
            remixDance &&
            badMood &&
            artistTrending &&
            albumHot &&
            weekChart &&
            bxhNhacNew ? (
                <div className="overflow-y-auto w-full ">
                    <div className="w-full h-[70px]"></div>
                    <Slider />
                    <Section data={chill} />
                    <NewRelease />
                    <Section data={loveLife} />
                    <Section data={remixDance} />
                    <Section data={badMood} />
                    <Section data={artistTrending} />
                    {bxhNhacNew && (
                        <div className="flex flex-col  px-[43px] w-full mt-12 gap-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[20px] font-bold pl-4">{bxhNhacNew?.title}</h3>
                                <span className="text-xs">TẤT CẢ</span>
                            </div>
                            <div className="w-full  ">
                                <Sliders {...settings}>
                                    {bxhNhacNew?.items?.map((item, index) => (
                                        <div key={item.encodeId} className="flex px-4">
                                            <div className="flex items-center gap-3 p-[10px] w-full h-[140px] bg-main-100 rounded-md cursor-pointer">
                                                <img
                                                    src={item.thumbnailM}
                                                    alt="thumbnail"
                                                    className="w-[110px] h-[110px] object-cover rounded-md"
                                                />
                                                <div className="flex flex-col w-full gap-5">
                                                    <div className="flex flex-col ">
                                                        <span className="text-[14px] font-semibold">{item.title}</span>
                                                        <span className="text-xs text-gray-500">
                                                            {item.artistsNames}
                                                        </span>
                                                    </div>
                                                    <div className="flex  items-baseline justify-between">
                                                        <span className="relative text-shadow-no4 text-main-100  text-[40px] font-black">
                                                            <span>#</span>
                                                            <span className="absolute top-[-1.5px] ">{index + 1}</span>
                                                        </span>
                                                        <span className="text-[14px] text-gray-500 font-medium">
                                                            {moment(item?.releaseDate * 1000).format('DD/MM/YYYY')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Sliders>
                            </div>
                        </div>
                    )}
                    <ChartSection />
                    <div className="flex items-center px-[43px] w-full mt-12">
                        {weekChart?.map((item) => (
                            <Link to={item?.link?.split('.')[0]} key={item.link} className="flex-1 px-4">
                                <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
                            </Link>
                        ))}
                    </div>

                    <Section data={top100} />
                    <Section data={albumHot} />
                    <div className="w-full h-[500px]"></div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
            )}
        </>
    )
}

export default Home
