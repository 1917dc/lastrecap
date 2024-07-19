"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _image_text;
const API_KEY = 'c9d3233f3430ee28ba0e643cb973eac5';
class artist {
    constructor(name, mbid, url) {
        this.name = name;
        this.url = url;
        this.mbid = mbid;
    }
}
class userTrack {
    constructor(name, playcount, artist) {
        this.name = name;
        this.playcount = playcount;
        this.artist = artist;
    }
}
class image {
    constructor(text, size) {
        _image_text.set(this, void 0);
        __classPrivateFieldSet(this, _image_text, text, "f");
        this.size = size;
    }
    getText() {
        return __classPrivateFieldGet(this, _image_text, "f");
    }
}
_image_text = new WeakMap();
function fetchCover(userTrack) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlTrack = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(userTrack.artist.name)}&track=${encodeURIComponent(userTrack.name)}&format=json`;
        try {
            const response = yield fetch(urlTrack);
            if (!response.ok) {
                throw new Error(`Error fetching cover: ${response.status}`);
            }
            const userTrackInfo = yield response.json();
            console.log(userTrackInfo);
            userTrackInfo.track.album.image.forEach((img) => {
                console.log(img.getText);
            });
        }
        catch (error) {
            console.error("Deu ruim na capa do álbum", error);
        }
    });
}
function getData(user, limit, period) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&api_key=${API_KEY}&limit=${limit}&period=${period}&format=json`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching API:${response.status} `);
            }
            const tracklist = yield response.json();
            tracklist.toptracks.track.forEach((track) => {
                console.log(track.artist.name);
                fetchCover(track);
            });
        }
        catch (error) {
            console.error("Deu erro", error);
        }
    });
}
getData('gfxnx', 5, '1month');
