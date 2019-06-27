var  handleTypographyDropdown = function(){
	$('#typeFontSelector').on("change", function() {
        var $self = $(this),
            $selectedOption = $self.find("option:selected"),
            dataSet = $selectedOption.data();
        $('#typeFontId').text(dataSet.class);
        $('#typeFontSample').attr("class", dataSet.class);
        $('#typeFontInfo').text(dataSet.info);
    });
}
window.onload = function() {
    handleTypographyDropdown();
}