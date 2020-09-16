import {Route} from 'vue-router';

export default {
	name: 'crypto',
	path: 'crypto',
	component: () => import('@/modules/crypto/CryptoMasterComponent.vue'),
	redirect: {name: 'currency'},
	children: [
		{
			name: 'currency',
			path: 'currency',
			component: () => import('@/modules/crypto/components/CryptoCurrencyComponent.vue'),
		},
		{
			name: 'currency-entry',
			path: 'currency/:currency',
			component: () => import('@/modules/crypto/components/CryptoCurrencyComponent.vue'),
			props: (route: Route) => ({ cryptoCurrencyName: route.params.currency })
		}
	]
}
