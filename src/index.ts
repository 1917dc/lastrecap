const private urlAPI = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=gfxnx&api_key=APIKEY&format=json'

async function getData(url:string) {
  try {
    const response = await fetch(url);
    if(!response.ok){
      console.error(`Erro ao consultar api: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    throw new Error("Não tá ok");
    
  }
}

getData(urlAPI);
