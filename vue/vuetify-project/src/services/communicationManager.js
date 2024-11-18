const apiKey = '79bf3a0';
const apiUrl = 'http://www.omdbapi.com/'

export async function getPelis(searchString) {
    const response = await fetch (`${apiUrl}?s=${searchString}&apikey=${apiKey}`)
    const data = await response.json()
    return data;
}
export const getPelisById = async (imdbID) =>{
    const response = await fetch(`${apiUrl}?i=${imdbID}&apikey=${apiKey}`)
    const data = await response.json()
    return data;

}



