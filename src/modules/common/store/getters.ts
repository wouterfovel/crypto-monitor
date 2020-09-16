import {CommonState} from '@/modules/common/store/types';
import {RootState} from '@/store';
import {GetterTree} from 'vuex';

export const getters: GetterTree<CommonState, RootState> = {

	loading(state): boolean {
		return state.loading;
	},
	networkError(state): boolean {
		return state.networkError;
	},
};
