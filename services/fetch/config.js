export const baseURL = 'https://backendcomparts.centrion.com.br/api/';

export const asyncFetch = async (url, name) => {
    return await useAsyncData(name, () => $fetch(baseURL+url));
}