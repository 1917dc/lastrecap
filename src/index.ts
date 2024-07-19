import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.LASTFM_API_KEY;

class artist {
  name : string;
  mbid : string;
  url : string;

  constructor(name : string, mbid : string, url : string){
    this.name = name;
    this.url = url;
    this.mbid = mbid;
  }
}

class userTrack {
  name : string;
  playcount : number;
  artist : artist;

  constructor(name : string, playcount : number, artist : artist){
    this.name = name;
    this.playcount = playcount;
    this.artist = artist;
  }
}

class image {
  #text : string;
  size : string;

  constructor(text : string, size : string){
    this.#text = text;
    this.size = size;
  }

  getText(){
    return this.#text;
  }
}

async function fetchCover(userTrack : userTrack){
  const urlTrack = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(userTrack.artist.name)}&track=${encodeURIComponent(userTrack.name)}&format=json`;
  try {
    const response = await fetch(urlTrack);
    if(!response.ok){
      throw new Error(`Error fetching cover: ${response.status}`);
    }
    const userTrackInfo = await response.json();
    console.log(userTrackInfo);
    userTrackInfo.track.album.image.forEach((img : image) => {
      console.log(img.getText);
    });
  } catch (error) {
    console.error("Deu ruim na capa do álbum", error)
  }
}

async function getData(user : string, limit : number, period : string) {
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&api_key=${API_KEY}&limit=${limit}&period=${period}&format=json` 
  try {
    const response = await fetch(url)
    if(!response.ok){
      throw new Error(`Error fetching API:${response.status} `);
    }
    const tracklist = await response.json();
    tracklist.toptracks.track.forEach((track : userTrack) => {
      console.log(track.artist.name)
      fetchCover(track);
    });
  } 
  catch (error){
    console.error("Deu erro", error);
  }
 }

getData('gfxnx', 5, '1month')
