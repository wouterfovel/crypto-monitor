import {CommonState} from '@/modules/common/store/types';
import {RootState} from '@/store';
import {ActionContext} from 'vuex';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

export type CommonContext = ActionContext<CommonState, RootState>;

export const state: CommonState = {
	loading: false,
	networkError: false
};

const namespaced: boolean = true;

export const common = {
	namespaced,
	state,
	getters,
	actions,
	mutations
};
