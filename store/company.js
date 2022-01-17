export const state = () => ({
    companyInfo: {}
})

export const mutations = {
    setCompanyInfo(state, companyInfo) {
        state.companyInfo = companyInfo
    }
}

export const actions = {
    async fetchData({commit}, id) {
        const companyInfo = await this.$axios.$get(`http://api-test.duotek.ru/companies/info?id=${id || ''}`)
        commit('setCompanyInfo', companyInfo.data)
    }
}

export const getters = {
    companyInfo: s => s.companyInfo
}