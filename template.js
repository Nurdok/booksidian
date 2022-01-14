import {DateTime} from "./third_party/luxon.min.js";

export function populateTemplate(template, book) {
    return template.replace(/\{\{\s*(\w+):?([^}{\n]+)\s*\}\}/g, function(match, property, format, offset, string) {
        format = format.trim();
        if (book.hasOwnProperty(property)) {
            return book[property];
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

