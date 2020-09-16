import {CommonState} from '@/modules/common/store/types';
import {RootState} from '@/store';
import {ActionTree} from 'vuex';

export const actions: ActionTree<CommonState, RootState> = {

	setLoading: ({commit, dispatch}, payload: boolean) => {
		commit('setLoading', payload);
	},
	setNetworkError: ({commit, dispatch}, payload: boolean) => {
		commit('setNetworkError', payload);
	},
};
