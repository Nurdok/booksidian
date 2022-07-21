import {dedent} from "../common.js";

export const YOUTUBE_URL = 'www.youtube.com';

export const DEFAULT_OPTIONS = {
    vault: 'notes',
    file_location: '',
    note_title: '{{ short_title }} (YouTube)',
    note_content: dedent(`\
        ---
        tags:
        - youtube
        - video
        ---
        # {{ full_title }}
        
        | | |
        | - | - |
        | **Channel** | {{ channel }} |
        | | |
    `),
}