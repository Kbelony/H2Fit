// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': '1d2ec5e547msh9cfde6302cf2a33p17ad5ejsn8ffc774fdd86',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  
export const optionsYTB = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '483bec1f24msh8457a564c70f4cep1e6128jsn2433b5d9a1aa',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };


export const fetchData = async (url: RequestInfo | URL,options: RequestInit | undefined) =>{
  const response = await fetch(url,options);
  const data = await response.json()

  return data
}