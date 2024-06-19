export const baseURL = 'https://backend.comparts.com.br/api/';

export const asyncFetch = async (url, name) => {
    return await useAsyncData(name, () => $fetch(baseURL+url));
}