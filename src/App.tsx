import './App.css';
const API_KEY = process.env.API_KEY;

interface Track {
  name : string;
  artist : string;
  playcount : number;
}

async function fetchTopTracks(user : string, period : string, limit : number) : Promise<Array<Track> | string> {
  const api = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&period=${period}&limit=${limit}&api_key=${API_KEY}&format=json`

  try {
    const response = await fetch(api);

    if(!response.ok){
      throw new Error(`Error fetching API : ${response.status}`);
    }
    
    const {toptracks} = await response.json();
    return toptracks;

  } catch (error : any) {
    return (`Error returning API data : ${error.message}`) 
  }
}

function Period(){
  return(
     <select>
      <option>1 week</option>
      <option>1 month</option>
      <option>1 year</option>
    </select>
  );
}

function Size() {
  return (
    <select>
      <option>3x3</option>
      <option>5x5</option>
      <option>7x7</option>
    </select>
  );
}

function Username() {
  return (
    <input></input>
  );
}

const handleClick = () => {
  console.log("olá mundo!")
}

function Request() {
  return(
    <div className='divRequest'>
      <Username/>
      <Period/>
      <Size/>
      <button onClick={handleClick}>SUBMIT</button>
    </div>
  );
  }

function App() {
  return (
    <> 
      <Request/>
    </> 
  );
}

export default App;
