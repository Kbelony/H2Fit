// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': '24f2c66b83msh91fbdb3c8a6b710p173768jsn1bd187c8731c',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const fetchData = async (url: RequestInfo | URL,options: RequestInit | undefined) =>{
  const response = await fetch(url,options);
  const data = await response.json()

  return data
}