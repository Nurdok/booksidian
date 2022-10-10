import {dedent} from "../common.js";

export const YOUTUBE_URL = 'www.youtube.com';

export const DEFAULT_OPTIONS = {
    vault_yt: 'notes',
    file_location_yt: '',
    note_title_yt: '{{ short_title }} (YouTube)',
    note_content_yt: dedent(`\
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