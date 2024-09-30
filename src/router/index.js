import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/views/Homepage.vue';
import Favorites from '@/Views/Favorites.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Homepage,
		},

		{
			path: '/favoris',
			name: 'Favorites',
			component: Favorites,
		},
	],
});

export default router;
