<template>
	<div>
		<v-overlay :value="true">
			<v-row justify="center">
				Network error, please check your connection
			</v-row>
		</v-overlay>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class NetworkErrorComponent extends Vue {

	}
</script>
