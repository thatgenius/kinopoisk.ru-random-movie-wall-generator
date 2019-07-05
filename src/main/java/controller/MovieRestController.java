package controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/movies")
public class MovieRestController {
    public static final String ITEM = "true";
    public static final String NOT_SHOW_RATED = "false";
    public static final String COUNT = "30";
    public static final String COUNTRY = "[]";
    public static final String GENRE = "[]";
    public static final String MAX_YEARS = "2019";
    public static final String MIN_YEARS = "1920";
    public static final String TOKEN = "4DHBmLz_dsyRv8jonoiH12u0pAOA0YCueC41j5GkcuM";

    @RequestMapping(method = RequestMethod.GET, headers = "Accept=text/xml, application/json")
    public String[] movies() {
        return getMovies();
    }

    private String[] getMovies() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        setHeaders(headers);
        HttpEntity<String> request = new HttpEntity<String>(headers);
        String[] res = restTemplate.exchange(getUrl(), HttpMethod.GET, request, String[].class).getBody();
        return res;
    }

    private String getUrl() {
        String urlPattern = "https://www.kinopoisk.ru/chance/?item=%s&not_show_rated=%s&count=%s&country=%s&genre=%s&max_years=%s&min_years=%s&token=%s";
        return String.format(urlPattern, ITEM, NOT_SHOW_RATED, COUNT, COUNTRY, GENRE, MAX_YEARS, MIN_YEARS, TOKEN);
    }

    private void setHeaders(HttpHeaders headers) {
        headers.add("Accept", "application/json, text/javascript, */*; q=0.01");
        headers.add("Content-Type", "application/json; charset=utf-8");
    }
}
