import {dedent} from "../common.js";

export const IMDB_URL = 'www.imdb.com';

export const DEFAULT_OPTIONS = {
    vault: 'notes',
    file_location: '',
    note_title: '{{ title }} (movie)',
    note_content: dedent(`\
        ---
        tags:
        - movie
        ---
        # {{ title }}
        
        | | |
        | - | - |
        | **Director** | {{ director }} |
        | **Writers** | {{ writers }} |
        | **Actors** | {{ actors }} |
        | | |
    `),
}

// TODO: add this and make it work as part of the getMovieFromImdb function inside the bg script.
// export const TITLE_CLASS = 'sc-b73cd867-0';
