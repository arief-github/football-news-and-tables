import api from "./api";

const URLS = {
    newsPremierLeague: 'eng.1/news',
};
export const fetchPLNews = () => {
    return api.get(URLS.newsPremierLeague, {
        baseURL: 'https://site.api.espn.com/apis/site/v2/sports/soccer/',
    });
};