import {CommonState} from '@/modules/common/store/types';

import {MutationTree} from 'vuex';

export const mutations: MutationTree<CommonState> = {

	setLoading: (state, payload: boolean) => {
		state.loading = payload;
	},
	setNetworkError: (state, payload: boolean) => {
		state.networkError = payload;
	},
};
