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
        | **Writers** | {{ formatted_writers }} |
        | **Actors** | {{ formatted_actors }} |
        | | |

        ## Plot

        {{ plot_summary }}
    `),
}

// TODO: add this and make it work as part of the getMovieFromImdb function inside the bg script.
// export const TITLE_CLASS = 'sc-b73cd867-0';
// export const STORYLINE_CLASS = 'sc-132205f7-0';
// export const METADATA_CLASS = 'sc-bfec09a1-8';
// export const CAST_CLASS = 'sc-bfec09a1-0';
