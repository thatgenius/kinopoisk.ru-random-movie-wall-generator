$(function () {
    const DOMAIN_NAME = "https://www.kinopoisk.ru";

    $('button#find').click(function () {
        $.ajax({
            type: "GET",
            url: "/movies/",
            contentType: "text/xml, application/json",
            dataType: "json"
        }).done(function (htmlSnippet) {
            initStapelPlugin(htmlSnippet);
        });
    });

    function initStapelPlugin(htmlSnippet) {
        prepareMovieContainer(htmlSnippet);
        let $grid = $('#tp-grid');
        let $loader = $('<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>').insertBefore($grid);
        $grid.stapel({
            delay: 50,
            onLoad: function () {
                $loader.remove();
            },
            onReady: function () {
                $('li:eq(2)').click();
            }
        });
    }

    function prepareMovieContainer(htmlSnippet) {
        $('div#raw').html(htmlSnippet);
        fixUrls();
        let $movies = $('div#raw').find("div.movieBlock");
        cleanMovieContainer();
        fillMovieContainer($movies);
        $('div#raw').html('');
    }

    function fixUrls() {
        let $posters = $('div#raw').find('.poster');
        $.each($posters, function (i, e) {
            let $moviePosterImg = $(e).find('img');
            let $movieAnchor = $(e).find('a');
            let moviePosterRelativeUrl = $moviePosterImg.attr('src').substring(2);
            $moviePosterImg.attr('src', DOMAIN_NAME + moviePosterRelativeUrl);
            let movieAnchorRelativeUrl = $movieAnchor.attr('href');
            $movieAnchor.attr('href', DOMAIN_NAME + movieAnchorRelativeUrl);
        });
    }

    function cleanMovieContainer() {
        $('ul#tp-grid').html('');
    }

    function fillMovieContainer($movies) {
        $.each($movies, function (i, e) {
            let movieUrl = $(e).find('div.poster').find('a').attr('href'),
                movieTitle = $(e).find('meta').attr('name'),
                moviePosterUrl = $(e).find('div.poster').find('img').attr('src');
            $('ul#tp-grid').append(createMoviePosterLi(movieUrl, movieTitle, moviePosterUrl));
        });
    }

    function createMoviePosterLi(movieUrl, movieTitle, moviePosterUrl) {
        let $moviePosterLi = $('<li data-pile="movie poster">' +
            '<a href="' + movieUrl + '">' +
            '<span class="tp-info"><span>' + movieTitle + '</span></span>' +
            '<img src="' + moviePosterUrl + '" />' +
            '</a></li>');
        return $moviePosterLi;
    }
});