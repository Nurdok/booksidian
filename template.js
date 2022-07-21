import {DateTime} from "./third_party/luxon.min.js";

export function populateTemplate(template, obj) {
    return template.replace(/\{\{\s*(\w+)(:[^}{\n]+)?\s*\}\}/g, function(match, property, format, offset, string) {
        if (format !== undefined) {
            // Trim spaces and the ':' at the beginning of format.
            format = format.trim().slice(1);
        }
        if (obj.hasOwnProperty(property)) {
            let value = obj[property];
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

