function pagination(current, total, pageLimit) {
    var list = [],
        upperLimit, lowerLimit, currentPage;
    upperLimit = Math.min(current, total);
    lowerLimit = upperLimit;
    currentPage = lowerLimit;
    for (var b = 1; b < pageLimit && b < total;) {
        if (lowerLimit > 1) {
            lowerLimit--;
            b++;
        }
        if (b < pageLimit && upperLimit < total) {
            upperLimit++;
            b++;
        }
    }
    for (var i = lowerLimit; i <= upperLimit; i++) {
        if (i == currentPage) {
            list.push("[" + i + "]");
        } else {
            list.push(i);
        }
    }
    return list;
    // var counter = 0;
    // var tmpl = '<li class=page-number><a href="#" aria-label="jump to the first page" class="jump-to-first"> << </a></li><li class=page-number> <a href="#" class="go-to-previous"> < </a></li>';
    // for (counter = 0; counter < list.length; counter++) {
    //     if (typeof list[counter] == "number") tmpl += '<li class=page-number> <a href="#" class="page" data-pnum="' + list[counter] + '" >' + list[counter] + '</a></li>';
    //     else {
    //         tmpl += '<li class=page-number> <a href="#" class="page current" data-pnum="' + JSON.parse(list[counter])[0] + '">' + JSON.parse(list[counter])[0] + '</a></li>';
    //     }
    // }
    // tmpl += '<li class=page-number> <a href="#" class="go-to-next"> > </a></li><li class=page-number> <a href="#" aria-label="jump to the last page" class="jump-to-last"> >> </a></li>';
    // $('#test').html(tmpl);
}

export default function initPagination() {

    var pagelist = pagination(80, 100, 5);
    var context = {
        pagelist: pagelist
    };
    console.log(context)
    var source = $("#entry-template").html();
    console.log(source);
    var template = Handlebars.compile(source);
    $('.eiu-pagination-container').html(template(context));
}