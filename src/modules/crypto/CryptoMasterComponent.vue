<template>
	<div>
		<router-view/>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import {Action} from 'vuex-class';
	import {EndPoint} from '@/modules/common/entities/EndPoint.entity';

	@Component({})
	export default class CryptoMasterComponent extends Vue {

		readonly endPoint: EndPoint = {
			url: 'http://rest-sandbox.coinapi.io/v1/assets',
			tokenData: {
				'X-CoinAPI-Key': process.env.VUE_APP_COINMARKETCAP_API_KEY
			}
		}

		@Action('fetchCryptoCurrencies', {namespace: 'crypto'})
		private fetchCryptoCurrencies!: (endPoint: EndPoint) => Promise<any>;

		/**
		 * When the crypto module end-point is hit, all crypto currencies are fetched.
		 *
		 * @remarks
		 * Using the coinapi sandbox environment. This environment has limitations on the amount of data returned,
		 * as well as the accuracy of the data. However, it is possible to freely test with it. The non-sandbox env.
		 * only allows for 100 requests/day.
		 *
		 * @returns void
		 */
		private created(): void {
			this.fetchCryptoCurrencies(this.endPoint);
		}
	}
</script>
