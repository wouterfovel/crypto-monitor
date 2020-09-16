<template>
	<div>
		<v-overlay :value="true">
			<v-row justify="center">
				Page not found
			</v-row>
			<v-row justify="center" class="pt-4">
				<v-btn class="" elevation="0" @click="toIndexPage()">
					Reload
				</v-btn>
			</v-row>
		</v-overlay>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class PageNotFoundComponent extends Vue {

		private toIndexPage(): void {
			this.$router.push({path: '/'});
		}
	}
</script>
