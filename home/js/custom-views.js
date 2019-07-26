var handleTypographyDropdown = function() {
    $('.fontFamilySelector').on('change', function(e) {
        var $self = $(this);
        $('.font-variations p').css({
            "font-family": $self.find("option:selected").val()
        })
    });
    $('.font-variations p').css({
        "font-family": $('.fontFamilySelector').find("option:selected").val()
    })
}
window.onload = function() {
    handleTypographyDropdown();
}