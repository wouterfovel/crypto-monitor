<template>
	<v-container class="pa-0" fluid v-if="!loading">
		<v-row>
			<v-col class="pt-8 pl-8" cols="12" md="8">
				<v-row class="pl-8 pr-8" align="center" justify="space-between">
					<p>{{selectedCryptoCurrency ? selectedCryptoCurrency.name : ''}}</p>
					<p>{{ $t('monitoring.period')}}: {{$tc('time.minutes', cryptoHistoryPeriodInMinutes)}}</p>
				</v-row>
				<hl-crypto-currency-info :crypty-currency="selectedCryptoCurrency"/>
				<div class="px-3">
					<hl-crypto-currency-card :title="'Trend'" :tooltip="'Currency price trend in USD, during the monitoring period'">
						<template v-slot:body>
							<hl-crypto-currency-graph :graph-interval="currencyHistoryInterval"/>
						</template>
					</hl-crypto-currency-card>
				</div>
			</v-col>
			<v-col class="pa-0 menu" cols="12" md="4">
				<v-container class="pa-0" fluid >
					<div style="max-height: 100vh" class="overflow-y-auto overflow-x-hidden">
						<v-row class="py-1" :key="currency.asset_id" v-for="currency in currencies">
							<v-responsive>
								<v-lazy transition="fade-transition">
									<v-btn class="transparent" elevation="0"
										   @click="selectCryptoCurrency(currency)" style="width: 100%">
										<v-col cols="6" class="pa-0">
											<v-row align="start" class="pl-8">{{currency.name}}</v-row>
										</v-col>
										<v-col cols="6" class="pa-0">
											<v-row align="center" justify="end" class="pr-8">
												<v-tooltip bottom>
													<template v-slot:activator="{on}">
														<span v-on="on" class="txt-small text-color">{{price(currency)}}</span>
													</template>
                          <span v-t="{path: 'monitoring.dailyVolume', args: {currency: 'US Dollar'}}"></span>
												</v-tooltip>
											</v-row>
										</v-col>
									</v-btn>
								</v-lazy>
							</v-responsive>
						</v-row>
					</div>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
	import {Action, Getter} from 'vuex-class';
	import {CryptoCurrency} from '@/modules/crypto/entities/CryptoCurrency.entity';
	import {RawLocation} from 'vue-router';
	import {EndPoint} from '@/modules/common/entities/EndPoint.entity';
	import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';
	import CryptoCurrencyGraphComponent from '@/modules/crypto/components/CryptoCurrencyGraphComponent.vue';
	import CryptoCurrencyInfoComponent from '@/modules/crypto/components/CryptoCurrencyInfoComponent.vue';
	import CryptoCurrencyInfoCardComponent from '@/modules/crypto/components/CryptoCurrencyInfoCardComponent.vue';

	@Component({
		components: {
			'hl-crypto-currency-info': CryptoCurrencyInfoComponent,
			'hl-crypto-currency-graph': CryptoCurrencyGraphComponent,
			'hl-crypto-currency-card': CryptoCurrencyInfoCardComponent
		}
	})
	export default class CryptoCurrencyComponent extends Vue {

		readonly maxSandboxDataPoints: number = 10;
		readonly currencyHistoryInterval: number = 10; // Minutes

		private selectedCryptoCurrency: null | CryptoCurrency = null;

		@Prop({default: undefined})
		private cryptoCurrencyName: string | undefined;

		@Getter('loading', {namespace: 'common'})
		private loading: undefined | boolean;

		@Getter('cryptoCurrenciesByPopularity', {namespace: 'crypto'})
		private cryptoCurrenciesByPopularity: any;

		@Getter('cryptoHistory', {namespace: 'crypto'})
		private cryptoHistory: undefined | CryptoHistoryEntry[];

		@Action('fetchCryptoHistory', {namespace: 'crypto'})
		private fetchCryptoHistory!: (endPoint: EndPoint) => Promise<any>;

		private get currencies(): CryptoCurrency[] {
			const list: CryptoCurrency[] = this.cryptoCurrenciesByPopularity(1000);
			return list && list.length ? list : [];
		}

		/**
		 * Time period (in minutes) of historical data-points received.
		 *
		 * @remarks
		 * The returned historical results data-points cannot exceed the amount 10 in sandbox mode ...
		 *
		 * @returns number
		 */
		private get cryptoHistoryPeriodInMinutes(): number {
			return (this.maxSandboxDataPoints - 1) * this.currencyHistoryInterval;
		}

		/**
		 * When the currencies come available, fetch the history.
		 *
		 * @remarks
		 * On direct route: e.g. ../crypto/currencies/Bitcoin -> just load the referred crypto history
		 * On non-direct load: e.g. ../ -> get the first crypto, route to it (after routing, it'll be loaded)
		 *
		 * @returns void
		 */
		@Watch('currencies', {immediate: true})
		private onReady(): void {
			if (this.cryptoCurrencyName) {
				// explicit currency passed, show its data
				const currency: undefined | CryptoCurrency = this.currencies.find((c: CryptoCurrency) => c.name === this.cryptoCurrencyName);
				if (currency) {
					this.selectedCryptoCurrency = currency;
					this.fetchCryptoHistory(this.endPoint(currency));
				} else {
					this.selectFirstCryptoCurrency();
				}
			} else {
				this.selectFirstCryptoCurrency();
			}
		}

		/**
		 * Price of crypto, in USD. Or a '- USD' if unspecified.
		 *
		 * @returns string
		 */
		private price(currency: CryptoCurrency): string {
			return (currency.price_usd ? currency.price_usd.toFixed(2).toString() + ' USD' : '-');
		}

		private selectFirstCryptoCurrency(): void {
			if (this.currencies && this.currencies.length) {
				const currency: CryptoCurrency = this.currencies[0];
				this.selectCryptoCurrency(currency);
			}
		}

		/**
		 * Select and fetch history of the selected crypto
		 *
		 * @remarks
		 * Using the sandbox endpoint, this endpoint is only accessible via HTTP and
		 * only returns the last 10 historical data-points :(, but this is ok for testing
		 *
		 * @returns EndPoint
		 */
		private selectCryptoCurrency(currency: CryptoCurrency): void {
			if (currency != this.selectedCryptoCurrency) {
				this.selectedCryptoCurrency = currency;
				this.$router.push(({path: '/crypto/currency/' + currency.name} as unknown) as RawLocation);

				this.fetchCryptoHistory(this.endPoint(currency));
			}
		}

		/**
		 * Endpoint of selected crypto
		 *
		 * @returns EndPoint
		 */
		private endPoint(currency: CryptoCurrency): EndPoint {
			const endPoint: EndPoint = {
				url: `http://rest-sandbox.coinapi.io/v1/ohlcv/${currency.asset_id}/USD/latest?period_id=${this.currencyHistoryInterval}MIN`,
				tokenData: {
					'X-CoinAPI-Key': process.env.VUE_APP_COINMARKETCAP_API_KEY
				}
			}
			return endPoint;
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/variables';

	.transparent {
		background-color: transparent !important;
		color: white !important;
	}

	.menu {
		background-color: $color-background-card;
	}

	.text-color {
		color: $color-text-secondary;
	}
</style>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>
