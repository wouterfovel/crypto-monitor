import {CryptoState} from '@/modules/crypto/store/types';

import {MutationTree} from 'vuex';
import {CryptoCurrency} from '@/modules/crypto/entities/CryptoCurrency.entity';
import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';

export const mutations: MutationTree<CryptoState> = {

	setCryptoCurrencies: (state, payload: undefined | CryptoCurrency[]) => {
		state.cryptoCurrencies = payload;
	},
	setActiveCryptoHistory: (state, payload: undefined | CryptoHistoryEntry[]) => {
		state.cryptoHistory = payload;
	},
};
