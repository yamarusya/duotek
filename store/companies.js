export const state = () => ({
    companies: [],
    definitions: {},
    pages: {}
})

export const mutations = {
    setCompanies(state, companies) {
        state.companies = companies
    },
    setDefinitions(state, definitions) {
        state.definitions = definitions
    }
}

export const actions = {
    async fetchData({commit}, filters) {
        try {
            const companies = await this.$axios.$get(`http://api-test.duotek.ru/companies?search=${filters.search||''}&specializations=${filters.specializations||''}&industries=${filters.industries||''}&per_page=10&current_page=${filters.currentPage||1}`)
            commit('setCompanies', companies)
        }
        catch (e){
            commit('setCompanies', {data: [], meta: {}})

        }
    },
    async fetchDefinitions({commit}){
        const definitions = await this.$axios.$get(`http://api-test.duotek.ru/definitions`)
        commit('setDefinitions', definitions)
    }
}

export const getters = {
    companies: s => s.companies,
    definitions: s => s.definitions
}