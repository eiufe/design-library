import easydropdown from 'easydropdown';

var enableEIUDropdowns = function() {
    if($('.eiu-dropdown').length == 0){
        return false;
    }
    $('.eiu-dropdown').on('DOMSubtreeModified', function(e) {
        $(e.target).addClass("ready");
    });

    easydropdown('#eiuSortListOptions');
    easydropdown('#eiuCountryList', {
        callbacks: {
            onSelect: function(value) {
                Console.log('Selected Country: ' + value);
            }
        }
    });
    easydropdown('#eiuDisabledDropdown');
}

export default function dropdowns() {
    enableEIUDropdowns();
}