<template>
    <p v-if="fetchNewsStatusIdle">Welcome to News Sport</p>
    <p v-if="fetchNewsStatusPending">
        Loading
    </p>
    <p v-if="fetchNewsStatusError">
        There was a problem
    </p>

    <div v-if="fetchNewsStatusSuccess">
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
  import { apiStatusComputedFactory } from '@/helpers/apiStatusComputedFactory';

  const { IDLE, PENDING, SUCCESS, ERROR } = apiStatus

  export default {
    name: 'PLNewsList',
    data() {
        return {
            header: null,
            href: null,
            articles: [],
            fetchNewsStatus: IDLE
        }
    },
    computed: {
        ...apiStatusComputedFactory('fetchNewsStatus')
    },  
    methods: {
        async fetchPLNews() {
            this.fetchNewsStatus = PENDING;

            const { response, error } = await withAsync(fetchPLNews);

            if(error) {
                this.fetchNewsStatus = ERROR;
                return;
            }
            
            this.header = response.data.header;
            this.href = response.data.link.href;
            this.articles = response.data.articles;

            this.fetchNewsStatus = SUCCESS;
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