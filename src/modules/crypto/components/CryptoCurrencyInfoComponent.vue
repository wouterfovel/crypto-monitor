<template>
	<v-container fluid>
		<v-row align="center">
			<v-col cols="6">
				<hl-crypto-currency-card :title="shortName">
					<template v-slot:body>
						<span class="text-color">{{fullName}}</span>
					</template>
				</hl-crypto-currency-card>
			</v-col>
			<v-col cols="6">
				<hl-crypto-currency-card :title="$t('common.price_cap')" :tooltip="'Price in US Dollar on the monitoring period start'">
					<template v-slot:body>
						<span class="text-color">{{price}}</span>
					</template>
				</hl-crypto-currency-card>
			</v-col>
		</v-row>
		<v-row align="center">
			<v-col cols="6">
				<hl-crypto-currency-card :title="'Trades'" :tooltip="'Trades performed during the monitoring period'">
					<template v-slot:body>
						<span class="text-color">{{tradeCount}}</span>
					</template>
				</hl-crypto-currency-card>
			</v-col>
			<v-col cols="6">
				<hl-crypto-currency-card :title="'Volume'" :tooltip="'Volume reached during the monitoring period, in US Dollar'">
					<template v-slot:body>
						<span class="text-color">{{volume}}</span>
					</template>
				</hl-crypto-currency-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from 'vue-property-decorator';
	import {CryptoCurrency} from '@/modules/crypto/entities/CryptoCurrency.entity';
	import CryptoCurrencyInfoCardComponent from '@/modules/crypto/components/CryptoCurrencyInfoCardComponent.vue';
	import {Getter} from 'vuex-class';
	import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';

	@Component({
		components: {
			'hl-crypto-currency-card': CryptoCurrencyInfoCardComponent
		}
	})
	export default class CryptoCurrencyInfoComponent extends Vue {

		@Prop()
		private cryptyCurrency: undefined | CryptoCurrency;

		@Getter('cryptoHistory', {namespace: 'crypto'})
		private cryptoHistory: undefined | CryptoHistoryEntry[];

		private get shortName(): string {
			return this.cryptyCurrency ? this.cryptyCurrency.asset_id : '';
		}

		private get fullName(): string {
			return this.cryptyCurrency ? this.cryptyCurrency.name : '';
		}

		/**
		 * Price of crypto, in USD. Or a '- USD' if unspecified.
		 *
		 * @returns string
		 */
		private get price(): string {
			return (this.cryptyCurrency && this.cryptyCurrency.price_usd ?
				this.cryptyCurrency.price_usd.toFixed(2).toString() + ' USD' : '-');
		}

		/**
		 * The total trades of the crypto within the monitoring period. Or '-' when unspecified.
		 *
		 * @returns string
		 */
		private get tradeCount(): string {
			let count: string = '-';
			if (this.cryptoHistory) {
				count = this.cryptoHistory.reduce((sum, ch) => sum + ch.trades_count, 0).toString();
			}
			return count;
		}

		/**
		 * The total volume (e.g. '15 USD') of the crypto within the monitoring period. Or '0 USD' when unspecified.
		 *
		 * @returns string
		 */
		private get volume(): string {
			let vol: string = '-';
			if (this.cryptoHistory) {
				vol = Math.round(this.cryptoHistory.reduce((sum, ch) => sum + ch.volume_traded, 0)).toString();
			}
			return `${vol} USD`;
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/variables';

	.text-color {
		color: $color-text-secondary;
	}
</style>
