import "./third_party/moment.js";

export function populateTemplate(template, book) {
    return template.replaceAll(/\{\{\s*(\w+):?([^}{\n]+)\s*\}\}/g, function(match, property, format, offset, string) {
        format = format.trim();
        if (book.hasOwnProperty(property)) {
            return book[property];
        } else if (property === "date") {
            if (!format) {
                format = "YYYY-MM-DD";
            }
            return moment().format(format);
        } else if (property === "time") {
            if (!format) {
                format = "HH:mm";
            }
            return moment().format(format);
        } else {
            return property;
        }
    });
}


