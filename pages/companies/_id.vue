<template>
    <section>
        <div class="container">
            <nuxt-link to="/" class="companies">
                <svg class="button-icon" width="19" height="14" viewBox="0 0 19 14">
                    <path d="M7.70711 0.292893C8.09763 0.683417 8.09763 1.31658 7.70711 1.70711L3.41421 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H3.41421L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893Z" fill="#030953"/>
                </svg>
                <span class="button-text">
                    Компании
                </span>
            </nuxt-link>
            <div class="company__fullinfo">
                <div>
                    <h3 class="companyName"> {{ companyInfo.title }} </h3>
                    <span class="numbers">{{ companyInfo.age }}</span><span class="declination"> {{ ageDeclination(companyInfo.age) }}</span>
                    <span class="numbers">{{ companyInfo.staff }}</span><span class="declination"> {{ peopleDeclination(companyInfo.staff) }}</span>
                    <div class="description_short">{{ companyInfo.description_short }}</div>
                    <div class="description_full">{{ companyInfo.description_full }}</div>
                    <h3 class="tags-title" v-if="companyInfo.companySpecializations.length !== 0"> Специализации </h3>
                    <div class="fullinfo-tags">
                        <span v-for="(tag, i) in companyInfo.companySpecializations"
                            :key="i"
                            class="card-tag"
                        >
                            {{ tag.title }}
                        </span>
                    </div>
                    <h3 class="tags-title" v-if="companyInfo.industries.length !== 0"> Технологии </h3>
                        <div class="fullinfo-tags">
                            <span v-for="(tag, i) in companyInfo.industries"
                                :key="i"
                                class="card-tag"
                            >
                                {{ tag.title }}
                            </span>
                        </div>
                </div>
            </div>
            <div class="company__shortinfo">
                <img :src="companyInfo.picture">
                <div>
                    <p class="description_short-title">Сайт</p>
                    <a :href="companyInfo.url">{{ companyInfo.url }}</a>
                </div>
                <div>
                    <p class="description_short-title">Email</p>
                    <p>{{ companyInfo.contact_email }}</p>
                </div>
                <div>
                    <p class="description_short-title">Телефон</p>
                    <p>{{ companyInfo.contact_phone }}</p>
                </div>
                <div>
                    <p class="description_short-title">Офис</p>
                    <p>{{ companyInfo.country.title + ', ' + companyInfo.city.title }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default{
    async fetch({store, params}){
            await store.dispatch('company/fetchData', params.id)
        
  },
    computed: {
    ...mapGetters({
      'companyInfo': 'company/companyInfo'
  })
  },
    methods: {
        ageDeclination(age){
            if (age%100 > 20 || age%100 <= 4){
                if ( age%10 === 1) return 'год'
                if ( age%10 === 2 || age%10 === 3 || age%10 === 4 ) return 'года'
                return 'лет'
            }
            else return 'лет'
        },
        peopleDeclination(count){
            if (count%100 > 20 || count%100 <= 4){
                if ( count % 10 === 2 || count % 10 === 3 || count % 10 === 4 ) return 'человека'
                return 'человек'
            }
            else return 'человек'
        },

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap');

.companies {
    display: flex;
    padding: 6px;
    background: #fff;
    border: none;
}
.button-icon {
    margin-top: 5px;
    position:absolute;
}
.button-text {
    margin-left: 40px;
    color: #030953;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
}
.card-tag{
  height: 20px;
  font-size: 14px;
  padding: 5px 10px 5px 10px;
  background: #F7F7F7;
  border-radius: 200px;
  margin: 8px;
}
.fullinfo-tags{
    display: flex;
    flex-wrap: wrap;
}
.container {
    display: grid;
    gap: 30px;
    -ms-grid-gap: 0px;
    padding: 50px 100px 100px 50px;
    display: -ms-grid;
    -ms-grid-columns: 70% 30%;
    grid-template-columns: 70% 30%;
    height: 100%;
}
.company__fullinfo{
    padding: 0 30px;
    grid-column: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
}
.company__shortinfo{
    grid-column: 2;
    -ms-grid-column: 2;
    -ms-grid-column-span: 2;
    overflow: wrap;
}
.companyName{
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 130%;
}
.company__shortinfo img{
    max-width: 100%;
}
.company__shortinfo p, a{
    color: #030953;
}
.numbers{
    color: #EF3E4A;
    font-style: normal;
    font-weight: 300;
    font-size: 60px;
    line-height: 110%;
}
.declination{
    vertical-align: top;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 100%;
}
.description_short{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    margin-top: 10px;
}
.description_short-title{
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: #808080 !important;
}
.description_full{
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    margin-top: 24px;
    line-height: 150%;
}
.tags-title{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 100%;
}
</style>