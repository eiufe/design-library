var $ = require("jquery");
window.$ = $;
import buttonUI from './components/foundation elements/button/button';
import dropdowns from './components/foundation elements/form-inputs/dropdown/dropdown';
import initPagination from './components/foundation elements/pagination/pagination';

window.Handlebars = require("handlebars");
console.log(Handlebars);
    Handlebars.registerHelper('checkcurrentpage', function(number) {
        if(typeof(number) == "number"){
        	return '<a href=" #">' + number + '</a>';
        }
        else{
          	return '<a class="current-page" href=" #">' + JSON.parse(number)[0] + '</a>';
        }
    });

$(document).ready(function() {
    buttonUI();
    dropdowns();
    initPagination();
});