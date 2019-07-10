export default function buttonUI() {

    $(document).on('click', '.btn-ripple', function(e) {
        var $self = $(this);
        $self.find(".ripple").remove();

        var posX = $self.offset().left,
            posY = $self.offset().top,
            buttonWidth = $self.width(),
            buttonHeight = $self.height();

        if ($self.hasClass('btn-primary')) {
            $self.prepend("<span class='ripple ripple-primary'></span>");
        } else {
            $self.prepend("<span class='ripple ripple-secondary'></span>");
        }


        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;

        $self.find(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");

    });

}