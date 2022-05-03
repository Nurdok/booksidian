import {DateTime} from "../third_party/luxon.min.js";

export function populateTemplate(template, video) {
    return template.replace(/\{\{\s*(\w+):?([^}{\n]+)\s*\}\}/g, function(match, property, format, offset, string) {
        format = format.trim();
        if (video.hasOwnProperty(property)) {
            let value = video[property];
            if (value == null) {
                value = "";
            }
            return value;
        } else if (property === "date") {
            if (!format) {
                format = "yyyy-MM-dd";
            }
            return DateTime.now().toFormat(format);
        } else if (property === "time") {
            if (!format) {
                format = "HH:mm";
            }
            return DateTime.now().toFormat(format);
        } else {
            return property;
        }
    });
}

