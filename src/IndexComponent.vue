<template>
	<div>
		<router-view/>
		<hl-loading v-if="loading"/>
		<hl-network-error v-if="networkError"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator';
	import LoadingComponent from '@/modules/common/components/LoadingComponent.vue';
	import {Getter} from 'vuex-class';
	import NetworkErrorComponent from '@/modules/common/components/NetworkErrorComponent.vue';

	@Component({
		components: {
			'hl-loading': LoadingComponent,
			'hl-network-error': NetworkErrorComponent
		}
	})
	export default class IndexComponent extends Vue {

		@Getter('loading', {namespace: 'common'})
		private loading: boolean | undefined;

		@Getter('networkError', {namespace: 'common'})
		private networkError: boolean | undefined;

		private mounted(): void {
      this.$i18n.locale = 'nl';
    }
	}
</script>
