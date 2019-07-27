var $ = require("jquery");
window.$ = $;
import easydropdown from 'easydropdown';
window.easydropdown = easydropdown;
import buttonUI from './components/foundation elements/button/button';
buttonUI();

$(document).ready(function() {
    $('.eiu-dropdown').on('DOMSubtreeModified', function(e) {
        $(e.target).addClass("ready");
    });
    easydropdown.all();
});