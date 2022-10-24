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
        | **Writer** | {{ writer }} |
        | **Actors** | {{ actors }} |
        | | |
    `),
}