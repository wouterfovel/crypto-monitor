import {CryptoState} from '@/modules/crypto/store/types';
import {RootState} from '@/store';
import {ActionContext} from 'vuex';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

export type CryptoContext = ActionContext<CryptoState, RootState>;

export const state: CryptoState = {
	cryptoCurrencies: undefined,
	cryptoHistory: undefined
};

const namespaced: boolean = true;

export const crypto = {
	namespaced,
	state,
	getters,
	actions,
	mutations
};
