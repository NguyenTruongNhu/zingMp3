import React, { useEffect, useState, useRef } from 'react'
import { apiGetChartHome } from '../../apis'
import bgChart from '../../assets/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { SongItem, RankList } from '../../components'
import _ from 'lodash'

const ZingChart = () => {
    const [chartData, setChartData] = useState(null)
    const [data, setData] = useState(null)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [selected, setSelected] = useState(null)
    const chartRef = useRef()
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,

        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(0,0,0,0.3)', drawTicks: false },
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'gray' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState((prev) => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const counters = []
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chartData?.RTChart?.chart?.items?.[Object.keys(chartData?.RTChart?.chart?.items)[i]]
                                ?.filter((i) => +i.hour % 2 === 0)
                                ?.map((item) => item.counter),

                            encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
                        })
                    }
                    const rs = counters.find((i) =>
                        i.data.some((n) => n === +tooltip.body[0]?.lines[0]?.replace('.', '')),
                    )
                    setSelected(rs.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    }

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await apiGetChartHome()
            if (response.data.err === 0) {
                setChartData(response?.data?.data)
            }
        }
        fetchChartData()
    }, [])
    useEffect(() => {
        const labels = chartData?.RTChart?.chart?.times
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`)
        const datasets = []
        if (chartData?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]
                        ?.filter((i) => +i.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4,
                })
            }

            setData({ labels, datasets })
        }
    }, [chartData])

    return (
        <div className="">
            <div className="flex flex-col">
                <div className="relative">
                    <img src={bgChart} alt="bg-chart" className="w-full h-[400px] object-cover grayscale" />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-1/2 flex items-center px-[59px]">
                        <h3 className="font-bold text-[40px] text-main-500">#zingchart</h3>
                    </div>

                    <div className=" absolute top-1/3 left-0 right-0 bottom-0 px-[59px]">
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: 'absolute',
                            }}
                        >
                            <SongItem
                                key={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.encodeId}
                                title={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.title}
                                artists={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.artistsNames}
                                sid={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.encodeId}
                                thumbnail={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.thumbnail}
                                style="bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[59px] mt-12">
                <RankList data={chartData?.RTChart?.items} number={10} />
            </div>
            <div className="relative">
                <img src={bgChart} alt="bg-chart" className="w-full h-[650px] object-cover grayscale" />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]"></div>
                <div className="absolute top-0 left-0 right-0 bottom-1/2 mt-8 flex flex-col gap-4 px-[59px]">
                    <h3 className="font-bold text-[40px] text-main-500">Bảng Xếp Hạng Tuần</h3>
                    <div className="flex gap-4 h-fit">
                        {chartData?.weekChart &&
                            Object.entries(chartData?.weekChart)?.map((item, index) => (
                                <div className="flex-1 bg-gray-200 rounded-md px-[10px] py-5" key={index}>
                                    <h3 className="text-[24px] text-main-500 font-bold">
                                        {item[0] === 'vn'
                                            ? 'Việt Nam'
                                            : item[0] === 'us'
                                            ? 'US-UK'
                                            : item[0] === 'korea'
                                            ? 'k-pop'
                                            : ''}
                                    </h3>
                                    <div className="mt-4 h-fit">
                                        <RankList
                                            data={item[1].items}
                                            isHideAlbum={true}
                                            number={5}
                                            link={item[1].link}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    )
}

export default ZingChart
