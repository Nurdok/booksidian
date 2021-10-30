global.chrome = {
    action: {
        onClicked: {
            addListener: function () {}
        }
    }
};  
import {populateTemplate} from './template.js';
import {DateTime} from "./third_party/luxon.min.js";

test('test short title', () => {
    expect(populateTemplate("{{ short_title }} (book)", {short_title: "Hello"})).toBe("Hello (book)");
}); 


test('test date', () => {
    // TODO: Mock Datetime instead
    const now = DateTime.now().toFormat("yyyy-MM-dd"); 
    expect(populateTemplate("{{ date }}", {short_title: "Hello"})).toBe(now);
}); 