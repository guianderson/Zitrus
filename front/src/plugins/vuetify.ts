// Tradução Vuetify: https://stackoverflow.com/questions/54988842/change-base-language-of-vuetify-ui-components

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import pt from 'vuetify/src/locale/pt';

Vue.component('my-component', {
    methods: {
        changeLocale () {
            this.$vuetify.lang.current = 'pt';
        }
    }
});

export default new Vuetify({
    lang: {
        locales: { pt },
        current: 'pt'
    }
});
