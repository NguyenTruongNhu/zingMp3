import actionTypes from '../actions/actionTypes'
const initState = {
    banner: null,
    chill: null,
    loveLife: null,
    top100: null,
    remixDance: null,
    badMood: null,
    artistTrending: null,
    albumHot: null,
    isLoading: false,
    newRelease: null,
    weekChart: null,
    chart: null,
    rank: null,
    bxhNhacNew: null,
    scrollTop: true,
}
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === 'hSlider').items || null,

                chill: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || null,

                loveLife: action.homeData?.find((item) => item.sectionId === 'hEditorTheme2') || null,

                top100: action.homeData?.find((item) => item.sectionId === 'h100') || null,

                remixDance: action.homeData?.find((item) => item.sectionId === 'hEditorTheme3') || null,

                badMood: action.homeData?.find((item) => item.sectionId === 'hEditorTheme4') || null,

                artistTrending: action.homeData?.find((item) => item.sectionId === 'hArtistTheme') || null,

                albumHot: action.homeData?.find((item) => item.sectionId === 'hAlbum') || null,

                newRelease: action.homeData?.find((item) => item.sectionType === 'new-release') || null,

                weekChart: action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || null,

                chart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || null,

                rank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || null,

                bxhNhacNew: action.homeData?.find((item) => item.sectionId === 'hNewrelease') || null,
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            }
        case actionTypes.ZERO_SCROLLTOP:
            return {
                ...state,
                scrollTop: action.flag,
            }

        default:
            return state
    }
}
export default appReducer
