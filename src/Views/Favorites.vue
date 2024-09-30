<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';

const favorites = ref([]);

// Récupérer les favoris depuis le localStorage lors du montage du composant
onMounted(() => {
	const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
	favorites.value = storedFavorites;
});
</script>

<template>
	<div>
		<h1>Mes Favoris</h1>
		<div v-if="favorites.length === 0">Aucun favoris trouvé.</div>
		<div v-else>
			<Card
				v-for="(item, index) in favorites"
				:key="index"
				style="width: 25rem; margin-bottom: 1rem">
				<template #title>{{ item.type }}</template>
				<template #subtitle>{{ item.zipCode }}</template>
				<template #content>
					<p class="m-0">{{ item.price }}</p>
					<p v-if="item.available">Disponible</p>
					<p v-else>{{ item.dateAvailable }}</p>
				</template>
			</Card>
		</div>
	</div>
</template>
