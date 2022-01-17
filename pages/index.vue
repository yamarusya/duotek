<template>
  <div>
    <h3>Каталог компаний</h3>
    <div class="companies-page">
      <div class="companies-page__aside">
        <div class="filters">
          <div class="filters-selectIndustries"> 
            <label>Отрасль</label> 
            <client-only><v-select v-model="filters.industries" :options="definitions.Industry" placeholder="Все отрасли" label="title" @input="searchCompanies()"/></client-only>
          </div>
          <div class="filters-selectSpecialization"> 
            <label>Специализация</label> 
            <client-only> <v-select v-model="filters.specialization" :options="definitions.CompanySpecialization" placeholder="Все специализации" label="title" @input="searchCompanies()"/></client-only>
          </div>
        </div>
      </div>
      <div class="companies-page__main">
        <div class="text-field">
          <div class="text-field__icon">
            <input class="text-field__input" v-model="filters.search" type="search" name="search" id="search" placeholder="Поиск продуктов и отрасли">
            <span class="text-field__aicon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>
            </span>
            <button class="search-button" @click="searchCompanies()">
              Найти
            </button>
          </div>
        </div>
        <div>
          <nuxt-link v-for="(company, index) in companies.data" v-bind:key="index"
            class="card"
            :to="`companies/${company.id}`"
          >
            <div class="card-picture">
              <img :src="company.picture">
            </div>
            <div class="card-text">
              <h3> {{ company.title }} </h3>
              <p> {{company.description_short }} </p>
              <div class="card__tags">
                <span v-for="(tag, i) in company.industries"
                  :key="i"
                  class="card-tag"
                >
                  <div>
                    {{ tag.title }}
                  </div>
                </span>
              </div>
            </div>
            <svg class="card__arrow" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2929 0.292893C10.9024 0.683417 10.9024 1.31658 11.2929 1.70711L15.5858 6H1C0.447716 6 0 6.44772 0 7C0 7.55228 0.447716 8 1 8H15.5858L11.2929 12.2929C10.9024 12.6834 10.9024 13.3166 11.2929 13.7071C11.6834 14.0976 12.3166 14.0976 12.7071 13.7071L18.7071 7.70711C19.0976 7.31658 19.0976 6.68342 18.7071 6.29289L12.7071 0.292893C12.3166 -0.0976311 11.6834 -0.0976311 11.2929 0.292893Z" fill="#EF3E4A"/>
            </svg>
          </nuxt-link>
          <div v-if="!companies.data || companies.data.length == 0">
            <h3>Ничего не найдено</h3>
            <svg id="Outline" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#262626;}</style></defs><path class="cls-1" d="M409.42,403.06,285,278.63a124.32,124.32,0,1,0-16.14,15.92L393.39,419.09a11.33,11.33,0,0,0,16-16ZM117.85,270.33a101.82,101.82,0,1,1,144,0A101.94,101.94,0,0,1,117.85,270.33Z"/><path class="cls-1" d="M240.51,148.64a11.34,11.34,0,0,0-16,0L189,184.13l-36.3-36.29a11.33,11.33,0,0,0-16,16l36.29,36.3-35.49,35.49a11.34,11.34,0,0,0,16,16L189,216.2l34.69,34.69a11.33,11.33,0,1,0,16-16L205,200.17l35.5-35.49A11.36,11.36,0,0,0,240.51,148.64Z"/></svg>
          </div>
          <div class="pagination">
            <span v-for="page in companies.meta.last_page"
              :key="page"
            >
              <button 
                @click="filters.currentPage=Number(page), searchCompanies()"
                v-if="filters.currentPage!=page"     
              >
                {{page}}
              </button>
              <button 
                @click="filters.currentPage=Number(page), searchCompanies()"
                v-if="filters.currentPage==page"
                style="background: #F7F7F7; color: #808080"     
              >
                {{page}}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  watchQuery(newQuery, oldQuery) {
    setTimeout(()=>{
    this.filters.search = newQuery.search
    this.filters.currentPage = newQuery.current_page
    if (newQuery.industries){
      const industry = this.definitions.Industry.find(el => el.id == newQuery.industries)
      if (industry) this.filters.industries = industry
    }
    if (newQuery.specializations){
      const specialization = this.definitions.CompanySpecialization.find(el => el.id == newQuery.specializations)
      if (specialization) this.filters.specialization = specialization
    }}, 2000)
  },
  watch:{
    filters: {
      handler: function(newValue, oldValue){
        const filter ={search: newValue.search, currentPage: newValue.current_page, specializations: newValue.specialization ? newValue.specialization.id : '', industries: newValue.industries ? newValue.industries.id : ''}
        this.$store.dispatch('companies/fetchData', filter)
    }, 
    deep: true
    },
  },
  async fetch({store}){
    if (store.getters['companies/companies'].length === 0){
      const filter ={search: this.search, currentPage: 1}
      await store.dispatch('companies/fetchData', filter)
    }
    await store.dispatch('companies/fetchDefinitions')
  },
  data: () => ({
    filters: {
      search: '',
      currentPage: 1,
      specialization: {
        id: null,
        title: ''
      },
      industries: {
        id: null,
        title: ''
      }
    }
  }),
  created(){
    this.filters.search = this.$route.query.search
    this.filters.currentPage = this.$route.query.currentPage
    if (this.$route.query.industries){
      const industry = this.definitions.Industry.find(el => el.id == this.$route.query.industries)
      if (industry) this.filters.industries = industry
    }
    if (this.$route.query.specializations){
      const specialization = this.definitions.CompanySpecialization.find(el => el.id == this.$route.query.specializations)
      if (specialization) this.filters.specialization = specialization
    }
  },
  computed: {
    ...mapGetters({
      'companies': 'companies/companies',
      'definitions': 'companies/definitions'
  })
  },
  methods: {
    searchCompanies(){
      this.$router.push({path: this.$route.path, query: {search: this.filters.search, current_page: this.filters.currentPage, specializations: this.filters.specialization ? this.filters.specialization.id : '', industries: this.filters.industries ? this.filters.industries.id : ''} });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap');
h3{
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 130%;
  margin-left: 50px;  
}
.card:hover h3{
  color: #EF3E4A;
}
.companies-page{
  display: flex;
  flex-wrap: wrap;

}
.companies-page__main{
  width: 75%;
  margin-left: 50px;
}
.companies-page__aside {
  width: 264px;
  margin-left: 50px;
}
.filters div{
  margin-bottom: 20px;
}
.v-select {
  background: #fff;
}
@media (min-width: 1473px) {
  .companies-page__aside{
    order: 1;
  }
}

.card { 
  display: flex;
  padding: 32px;
  position: relative; 
  border-radius: 8px;
  color: #000000;
}
.card:hover {
  background: #03095308;
}
.card:hover .card-tag{
  background: white;
}
.card-text{
  height: 100%;
  width: 70%;
}
.card-picture{
  height: 100%;
  width: 30%;
}
.card img{
  width: 90%;
}
.card__tags{
  display: flex;
  flex-wrap: wrap;

}
.card-tag{
  height: 32px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  padding: 5px;
  margin: 5px;
  background: #F7F7F7;
  border-radius: 200px;
  display: block;
}
.card-text * {
  margin: 8px;
}
.card-text h3 {
  font-family: 'Rubik', sans-serif;
  font-size: 24px;
  color: #030953;
}
.card__arrow{
  right: 20px;
  bottom: 20px;
  position: absolute;
  visibility: hidden; 
}
.card:hover .card__arrow{
  right: 20px;
  bottom: 20px;
  position: absolute;
  visibility: inherit;
}
.pagination{
  margin: 48px 0 48px;
}
.pagination button{
  color: #030953;
  border: none;
  height: 40px;
  width: 40px;
  font-family: 'Rubik', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
}
.filters{
  font-family: 'Rubik', sans-serif;
  padding: 30px;
  margin: 0 0 50px;
  background: #F7F7F7;
  border-radius: 4px;
  font-size: 14px;
}
/************************************************* */
/* установим отступ 1rem от нижнего края элемента */
.text-field {
  margin-bottom: 1rem;
}
/* стили для label */
.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
}
/* стили для input */
.text-field__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.search-button{
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  background: #030953;
  border: none;
  width: 80px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  color: #fff;
  transition: color 0.15s ease-in-out;
}
.text-field__icon {
  position: relative;
}
.text-field__icon input {
  padding-left: 2.5rem;
}
.text-field__aicon {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0.875rem;
  width: 1rem;
  cursor: pointer;
  color: #bdbdbd;
  transition: color 0.15s ease-in-out;
}
.text-field__aicon:hover {
  color: #212529;
}
</style>
