// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': '483bec1f24msh8457a564c70f4cep1e6128jsn2433b5d9a1aa',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const fetchData = async (url: RequestInfo | URL,options: RequestInit | undefined) =>{
  const response = await fetch(url,options);
  const data = await response.json()

  return data
}