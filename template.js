import {DateTime} from "./third_party/luxon.min";

export function populateTemplate(template, book) {
    return template.replaceAll(/\{\{\s*(\w+)\s*\}\}/g, function(match, property, offset, string) {
        if (book.hasOwnProperty(property)) {
            return book[property];
        } else {
            return property;
        }
    });
}

