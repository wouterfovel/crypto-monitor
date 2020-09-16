import {CryptoState} from '@/modules/crypto/store/types';
import {RootState} from '@/store';
import {GetterTree} from 'vuex';
import {CryptoCurrency} from '@/modules/crypto/entities/CryptoCurrency.entity';
import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';

export const getters: GetterTree<CryptoState, RootState> = {

	cryptoCurrencies(state): undefined | CryptoCurrency[] {
		return state.cryptoCurrencies;
	},
	cryptoHistory(state): undefined | CryptoHistoryEntry[] {
		return state.cryptoHistory;
	},

	/**
	 * Get sorted list of currencies (by daily trade volume descending.
	 *
	 * @remarks
	 * Filter out currencies without name or USD price. Also filter out the non-crypto currencies.
	 * Limit the list to the value specified.
	 *
	 * @returns string
	 */
	cryptoCurrenciesByPopularity(state, gGetters) {
		return (limit: number): undefined | CryptoCurrency[] => {
			const list: CryptoCurrency[] = gGetters.cryptoCurrencies ? [...gGetters.cryptoCurrencies] : [];
			return list
				.sort((a, b) => a.volume_1day_usd < b.volume_1day_usd ? 1 : -1)
				.filter((c) => c.type_is_crypto && c.name && c.price_usd) // name = '' seem to exist in the data set??
				.slice(0, limit) // only 100 coins having the highest hourly volume
			;
		}
	},
};
