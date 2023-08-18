import axios from '../axios'
import actionTypes from '../store/actions/actionTypes'

export const getHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/home',
                method: 'get',
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
