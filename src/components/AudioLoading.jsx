import { Audio } from 'react-loader-spinner'
import React, { memo } from 'react'

const AudioLoading = () => {
    return (
        <Audio
            height="30"
            width="30"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default memo(AudioLoading)
