import {dedent} from "../common.js";

export const GOODREADS_URL = 'www.goodreads.com';

export const DEFAULT_OPTIONS = {
    vault: 'notes',
    file_location: '',
    note_title: '{{ short_title }} (book)',
    note_content: dedent(`\
        ---
        tags:
        - book
        ---
        # {{ short_title }}
        
        | | |
        | - | - |
        | **Full title** | {{ full_title }} |
        | **Authors** | {{ formatted_authors }} |
        | **Publication Year** | {{ publication_year }} |
        | **Rating**| {{ rating }} |
        | **No. of Ratings** | {{ rating_count }} |
        | **No. of Pages** | {{ total_pages }} |
        | **ISBN Number** | {{ isbn13 }} |
        | | |
    `),
}