<template>
	<v-card :min-height="100" elevation="10" class="background-card">
		<v-card-title>
			<span class="white--text">{{title}}</span>
		</v-card-title>
		<v-card-text>
			<template v-if="tooltip">
				<v-tooltip bottom>
					<template v-slot:activator="{on}">
						<div v-on="on">
							<slot name="body"/>
						</div>
					</template>
					<span >{{tooltip}}</span>
				</v-tooltip>
			</template>
			<template v-else>
				<slot name="body"/>
			</template>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from 'vue-property-decorator';

	@Component
	export default class CryptoCurrencyInfoCardComponent extends Vue {

		@Prop()
		private title: undefined | string;

		@Prop()
		private tooltip: undefined | string;
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/variables';

	.background-card {
		background-color: $color-background-card;
	}
</style>
