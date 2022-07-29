import axios from 'axios'

export const getmethod = async (url) => {
    const res = await axios.get(url);
    return res.data
}

export const postmethod = async (url, payload) => {
    const res = await axios.post(url, payload);
    return res.data
}

export const putmethod = async (url, payload) => {
    const res = await axios.put(url, payload);
    return res.data
}