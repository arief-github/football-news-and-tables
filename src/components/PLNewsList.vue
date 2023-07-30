<template>
    <p v-if="fetchNewsStatus === apiStatus.IDLE">Welcome to News Sport</p>
    <p v-if="fetchNewsStatus === apiStatus.PENDING">
        Loading
    </p>
    <p v-if="fetchNewsStatus === apiStatus.ERROR">
        There was a problem
    </p>

    <div v-if="fetchNewsStatus === apiStatus.SUCCESS">
        <h3 v-if="header">{{ header }}</h3>
        <a :href="href">ALL PL News</a>
        <ul v-for="article in articles" :key="article.id">
            <li v-for="data in article.images" :key="data.id">
                <img :src="data.url" alt="news-image"/>
                <p>{{ data.name }}</p>
                <p>
                    {{ data.caption }}
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
  import { fetchPLNews } from '../api/newsApi';
  import { apiStatus } from '../api/apiStatus';
  import { withAsync } from '../helpers/withAsync';

  export default {
    name: 'PLNewsList',
    data() {
        return {
            header: null,
            href: null,
            articles: [],
            fetchNewsStatus: apiStatus.IDLE
        }
    },
    methods: {
        async fetchPLNews() {
            this.fetchNewsStatus = apiStatus.PENDING;

            const { response, error } = await withAsync(fetchPLNews);

            if(error) {
                this.fetchNewsStatus = apiStatus.ERROR;
                return;
            }
            
            this.header = response.data.header;
            this.href = response.data.link.href;
            this.articles = response.data.articles;

            this.fetchNewsStatus = apiStatus.SUCCESS;
        },
        fetchNews() {
            this.fetchPLNews();
        }
    },
    created() {
        this.apiStatus = apiStatus;
        this.fetchNews();
    }
  }
</script>