import IndexComponent from '@/IndexComponent.vue';
import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';
import {commonRoutes} from '@/modules/common';
import {cryptoRoutes} from '@/modules/crypto';

Vue.use(Router);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		component: IndexComponent,
		redirect: {path: 'crypto'},
		children: [
			...commonRoutes, // no common routes atm, so spreading
			cryptoRoutes
		]
	},
	{
		path: '*',
		component: () => import('@/modules/common/components/PageNotFoundComponent.vue')
	}
];

const router = new Router({
	mode: 'history',
	routes
});

export default router;
