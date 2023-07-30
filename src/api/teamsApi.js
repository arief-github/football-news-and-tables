import api from "./api";

const URLS = {
    teamsPremierLeauge: 'eng.1/teams'
};

export const fetchPLTeams = () => {
    return api.get(URLS.teamsPremierLeauge, {
        baseURL: 'https://site.api.espn.com/apis/site/v2/sports/soccer/'
    })
};