// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': '397d9c5b6bmsh5f634f02d033bc9p14c390jsnf9502756e504',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const fetchData = async (url: RequestInfo | URL,options: RequestInit | undefined) =>{
  const response = await fetch(url,options);
  const data = await response.json()

  return data
}