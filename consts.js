import { GOODREADS_URL } from "./goodreads/consts.js";
import { GOODREADS_HANDLER } from './goodreads/handler.js'
import { YOUTUBE_URL } from "./youtube/consts.js";
import { YOUTUBE_HANDLER } from "./youtube/handler.js";
import { IMDB_URL } from "./imdb/consts.js";
import { IMDB_HANDLER } from "./imdb/handler.js";

const HANDLERS = { 
    goodreads: {
        url: GOODREADS_URL,
        handler: GOODREADS_HANDLER
    },
    youtube: {
        url: YOUTUBE_URL,
        handler: YOUTUBE_HANDLER
    },
    imdb: {
        url: IMDB_URL,
        handler: IMDB_HANDLER
    }
};

export { HANDLERS }