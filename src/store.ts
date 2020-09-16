import {common} from '@/modules/common/store';
import {crypto} from '@/modules/crypto/store';
import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';

Vue.use(Vuex);

export interface RootState {
	maintenance: boolean;
}

const storeObject: StoreOptions<RootState> = {
	strict: true,
	state: {
		maintenance: false
	},
	modules: {
		common,
		crypto
	}
};

export const store = new Vuex.Store<RootState>(storeObject);
