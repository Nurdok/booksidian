function dedent(text) {
    let re_whitespace = /^([ \t]*)(.*)\n/gm;
    let l, m, i;
    while ((m = re_whitespace.exec(text)) !== null) {
        if (!m[2]) continue;
        if (l = m[1].length) {
            i = (i !== undefined) ? Math.min(i, l) : l;
        } else break;
    }
    if (i)
        text = text.replace(new RegExp('^[ \t]{' + i + '}(.*\n)', 'gm'), '$1');
    return text;
}

export const YOUTUBE_URL = 'www.youtube.com';

export const DEFAULT_OPTIONS = {
    vault: 'notes',
    file_location: '',
    note_title: '{{ title }} (youtube video)',
    note_content: dedent(`\
        ---
        tags:
        - youtube
        - video
        ---
        # {{ title }}
        
        | | |
        | - | - |
        | **Channel** | {{ channel }} |
        | | |
    `),
}