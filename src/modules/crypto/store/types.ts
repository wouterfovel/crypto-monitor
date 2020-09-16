import {CryptoCurrency} from '@/modules/crypto/entities/CryptoCurrency.entity';
import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';

export interface CryptoState {
	// mot defined -> not yet fetched (initial state); null | ArrayList -> loaded either with or without data
	cryptoCurrencies: undefined | CryptoCurrency[];
	cryptoHistory: undefined | CryptoHistoryEntry[];
}
