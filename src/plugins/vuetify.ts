import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

const vuetifyOptions: any = {
	theme: {
		dark: true,
		themes: {
			light: {
				error: colors.red.accent3,
				loader: '#FF416C'
			},
			dark: {
				error: colors.red.accent3,
				loader: '#FF416C'
			},
		},
	},
	icons: {
		iconfont: 'mdi'
	}
};

Vue.use(Vuetify);

export default new Vuetify(vuetifyOptions);
