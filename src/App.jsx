import React from 'react';
import ReactDOM from "react-dom/client";

const API_KEY = process.env.REACT_APP_API_KEY;

const user = "gfxnx"
const period = "7day"
const limit = 9

let arrayAlbums = [];


async function fetchAlbums(user, limit, period){
    const api = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${API_KEY}&limit=${limit}&period=${period}&format=json`
    try{
        const response = await fetch(api)
        if(!response.ok){
            throw new Error("Could not fetch albums")
        }
        return await response.json();
    } catch(error) {
        console.error(error)
    }
};

function ReturnImage(){

    return (
        <>
            let arrayAlbums = []
            fetchAlbums(user,limit,period).then(albums => {
            albums.topalbums.album.forEach(album => {
                return <img src = {arrayAlbums.image[2]["#text"]}/>
            })
        })
        </>
    );

}

function App() {
    return (
      <>
            <ReturnImage/>
      </>
    );
}

export default App;
