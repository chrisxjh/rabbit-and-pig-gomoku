import axios from 'axios';

const backendUrl = 'http://localhost:8080/gomoku';

const getUrl = (target) => `${backendUrl}/${target}`;

export const httpGet = (url) => axios.get(url);

export const httpPost = (url, data) => axios.post(url, data);

export const httpPut = (url, data) => axios.put(url, data);

export const serverGet = (target) => httpGet(getUrl(target));

export const serverPost = (target, data) => httpPost(getUrl(target), data);

export const serverPut = (target, data) => httpPut(getUrl(target), data);
