var $ = require("jquery");
window.$ = $;
import buttonUI from './components/foundation elements/button/button';
import dropdowns from './components/foundation elements/form-inputs/dropdown/dropdown';
import initPagination from './components/foundation elements/pagination/pagination';

window.Handlebars = require("handlebars");
console.log(Handlebars);

$(document).ready(function() {
    buttonUI();
    dropdowns();
    initPagination();
});