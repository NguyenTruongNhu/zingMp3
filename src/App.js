import { useEffect, useState } from 'react'
import {
    Home,
    Login,
    Public,
    Personal,
    Album,
    WeekRank,
    ZingChart,
    Search,
    SearchSong,
    SearchAll,
    Singer,
    SearchPlaylist,
} from './containers/public'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import path from './utils/path'
import * as actions from './store/actions'
import { useDispatch } from 'react-redux'
import { apiGetChartHome } from './apis'
function App() {
    const dispatch = useDispatch()
    const [weekchart, setWeekchart] = useState(null)
    useEffect(() => {
        dispatch(actions.getHome())
        const fetchChartData = async () => {
            const response = await apiGetChartHome()
            if (response.data.err === 0) setWeekchart(response.data.data.weekChart)
        }
        fetchChartData()
    }, [])
    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
                        <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
                        <Route
                            path={path.WEEKRANK__TITLE__PID}
                            element={<WeekRank weekchart={weekchart && Object.values(weekchart)} />}
                        />
                        <Route path={path.ZING_CHART} element={<ZingChart />} />
                        <Route path={path.HOME_SINGER} element={<Singer />} />
                        <Route path={path.HOME_ARTIST_SINGER} element={<Singer />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.SONG} element={<SearchSong />} />
                            <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
                        </Route>

                        <Route path={path.STAR} element={<Home />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App
