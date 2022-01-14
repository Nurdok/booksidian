global.chrome = {
    action: {
        onClicked: {
            addListener: function () {}
        }
    }
};  
import {populateTemplate} from './template.js';
import {Settings, DateTime} from "./third_party/luxon.min.js";

// Set the time to be constant for testing.
// From: https://github.com/moment/luxon/issues/254#issuecomment-386495652
Settings.now = () => 1494837020000; // 2017-05-15 08:30:20 AM GMT.
Settings.defaultZone = 'gmt'  // Otherwise dates depend on local machine timezone.


test('test short title', () => {
    expect(populateTemplate("{{ short_title }} (book)", {short_title: "Hello"})).toBe("Hello (book)");
}); 


test('test date', () => {
    expect(populateTemplate("{{ date }}", {short_title: "Hello"})).toBe("2017-05-15");
});

test('test time', () => {
    expect(populateTemplate("{{ time }}", {short_title: "Hello"})).toBe("08:30");
});

test('test date formatting', () => {
    expect(populateTemplate("{{ date:ffff }}", {})).toBe("Monday, 15 May 2017, 08:30 Coordinated Universal Time")
});