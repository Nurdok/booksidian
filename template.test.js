global.chrome = {
    action: {
        onClicked: {
            addListener: function () {}
        }
    }
};  
import {populateTemplate} from './template.js';

test('basic test', () => {
    expect(populateTemplate("{{ short_title }} (book)", {short_title: "Hello"})).toBe("Hello (book)");
}); 