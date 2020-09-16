<template>
	<div>
		<v-overlay :value="true">
			<v-progress-circular :size="50" color="loader" indeterminate/>
		</v-overlay>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class LoadingComponent extends Vue {

	}
</script>
