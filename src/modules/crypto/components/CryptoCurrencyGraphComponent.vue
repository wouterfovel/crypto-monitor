<template>
	<v-container fluid>
		<template v-if="values">
			<v-row>
				<v-col cols="1" align-self="stretch">
					<v-row align-content="space-between" class="max-height">
						<v-col class="pa-0" cols="12">
							<span class="text-color" v-if="lowestHistoricalDataValue != highestHistoricalDataValue">{{highestHistoricalDataValue}}</span>
						</v-col>
						<v-col class="pa-0 mb-6" cols="12">
							<span class="text-color">{{lowestHistoricalDataValue}}</span>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="11">
					<v-sparkline
							:value="values"
							:gradient="gradient"
							:smooth="true"
							:padding="8"
							:gradient-direction="'bottom'"
							:type="type"
							:auto-line-width="false"
							line-width="1"
							auto-draw
							:show-labels="true"
							:label-size="5"
							:labels="labels"
							:color="color"
					/>
				</v-col>
			</v-row>
		</template>
		<template v-else>
			<v-col class="pa-0">
				<v-row align="center">
					<span class="txt-small error--text">no historical data present</span>
				</v-row>
			</v-col>
		</template>
	</v-container>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from 'vue-property-decorator';
	import {Getter} from 'vuex-class';
	import {CryptoHistoryEntry} from '@/modules/crypto/entities/CryptoHistoryEntry.entity';

	@Component({
		components: {
		}
	})
	export default class CryptoCurrencyGraphComponent extends Vue {

		// Keep in sync with global defined colors - could use 'CSS Modules', which would expose a 'this.$style'
		// This, so we can keep all colors/gradients in the global/variables.scss
		readonly gradient = ['#FF416C', '#FF4B2B'];
		readonly color = '#FF416C';

		private type: string = 'trend';

		@Prop({default: 10})
		private graphInterval: undefined | number; // still needs undefined, even with default: 10

		@Getter('cryptoHistory', {namespace: 'crypto'})
		private cryptoHistory: undefined | CryptoHistoryEntry[];

		private get history(): CryptoHistoryEntry[] {
			return this.cryptoHistory && this.cryptoHistory.length ? this.cryptoHistory : [];
		}

		/**
		 * Get all crypto currency prices, rounded
		 *
		 * @returns null | number[]
		 */
		private get values(): null | number[] {
			const values: number[] = this.history.map((e) => Math.round(e.price_open));
			return values.length ? values : null;
		}

		/**
		 * Get all crypto currency x-axis values as minutes counting back
		 *
		 * @returns null | string[]
		 */
		private get labels(): null | string[] {
			const interval: number = this.graphInterval ? this.graphInterval : 10;
			let list: null | string[] = null;
			const dataPoints: number = this.values ? this.values.length : 0;
			if (dataPoints) {
				list = this.history.map((e, i) => (interval * (dataPoints - i - 1)).toString());
			}
			return list;
		}

		private get highestHistoricalDataValue(): null | number {
			return this.values ? Math.max(...this.values) : null;
		}

		private get lowestHistoricalDataValue(): null | number {
			return this.values ? Math.min(...this.values) : null;
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/variables';

	.background-card {
		background-color: $color-background-card;
	}

	.text-color {
		color: $color-text-secondary;
	}

	.max-height {
		height: 100%;
	}
</style>
