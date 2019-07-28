var $ = require("jquery");
window.$ = $;
import buttonUI from './components/foundation elements/button/button';
import dropdowns from './components/foundation elements/form-inputs/dropdown/dropdown';

$(document).ready(function() {
    buttonUI();
    dropdowns();
});