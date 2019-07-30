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
}

export default function initPagination() {
    var pagelist = pagination(80, 100, 9);
    var context = {
        pagelist: pagelist
    };
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    $('.eiu-pagination-container').html(template(context));
}