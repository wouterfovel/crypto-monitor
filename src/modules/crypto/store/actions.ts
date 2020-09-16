import {CryptoState} from '@/modules/crypto/store/types';
import {RootState} from '@/store';
import {ActionTree} from 'vuex';
import {CryptoCurrency} from '@/modules/crypto/entities/CryptoCurrency.entity';
import {EndPoint} from '@/modules/common/entities/EndPoint.entity';
import axios from 'axios';
import {ActionContext} from 'vuex';
import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';

export const actions: ActionTree<CryptoState, RootState> = {

	/**
	 * Fetches all crypto currencies.
	 *
	 * @remarks
	 *
	 * @param context: State context
	 * @param endPoint: Target endPoint
	 *
	 * @returns Promise
	 */
	fetchCryptoCurrencies: async (context: ActionContext<CryptoState, RootState>, endPoint: EndPoint) => {

		return new Promise((resolve, reject) => {
			try {
				context.dispatch('common/setLoading', true, {root: true});
				axios.request({
					method: 'GET',
					url: endPoint.url,
					headers: endPoint.tokenData
				}).then((res) => {
					if (res && res.data) {
						context.commit('setCryptoCurrencies', res.data);
						context.dispatch('common/setLoading', false, {root: true});
						resolve(res);
					} else {
						context.commit('setCryptoCurrencies', []);
						context.dispatch('common/setLoading', false, {root: true});
						resolve(true);
					}
				}).catch((e) => {
					context.dispatch('common/setLoading', false, {root: true});
					context.dispatch('common/setNetworkError', true, {root: true});
					reject(e);
				});
			} catch (e) {
				reject(e);
			}
		});
	},

	/**
	 * Fetches specific crypto history.
	 *
	 * @remarks
	 * We receive the history list inversed, so we reverse it before putting it into the store
	 *
	 * @param context: State context
	 * @param endPoint: Target endPoint
	 *
	 * @returns Promise
	 */
	fetchCryptoHistory: async (context: ActionContext<CryptoState, RootState>, endPoint: EndPoint) => {

		return new Promise((resolve, reject) => {
			try {
				context.dispatch('common/setLoading', true, {root: true});
				axios.request({
					method: 'GET',
					url: endPoint.url,
					headers: endPoint.tokenData
				}).then((res) => {
					if (res && res.data) {
						context.commit('setActiveCryptoHistory', res.data.reverse());
						context.dispatch('common/setLoading', false, {root: true});
						resolve(res);
					} else {
						context.commit('setCryptoCurrencies', []);
						context.commit('setActiveCryptoHistory', []);
						context.dispatch('common/setLoading', false, {root: true});
						resolve(true);
					}
				}).catch((e) => {
					context.dispatch('common/setLoading', false, {root: true});
					context.dispatch('common/setNetworkError', true, {root: true});
					reject(e);
				});
			} catch (e) {
				reject(e);
			}
		});
	},

	setCryptoCurrencies: ({commit, dispatch}, payload: undefined | CryptoCurrency[]) => {
		commit('setCryptoCurrencies', payload);
	},

	setCryptoHistory: ({commit, dispatch}, payload: undefined | CryptoHistoryEntry[]) => {
		commit('setCryptoHistory', payload);
	},
};
