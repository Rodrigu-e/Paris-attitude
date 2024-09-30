<script setup>
import { defineProps, ref, watch } from 'vue';

import Button from 'primevue/Button';
import Card from 'primevue/card';

const props = defineProps({ data: Object });
const { type, zipCode, price, available, dateAvailable } = props.data;
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const isFavorite = ref(favorites.some((item) => item.zipCode === zipCode));

const saveToFavorites = () => {
	if (!isFavorite.value) {
		favorites.push({
			type,
			zipCode,
			price,
			available,
			dateAvailable,
		});
		localStorage.setItem('favorites', JSON.stringify(favorites));
		isFavorite.value = true;
	}
};

const removeFromFavorites = () => {
	if (isFavorite.value) {
		const updatedFavorites = favorites.filter((item) => item.zipCode !== zipCode);
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		isFavorite.value = false;
	}
};

watch(
	() => favorites.length,
	() => {
		isFavorite.value = favorites.some((item) => item.zipCode === zipCode);
	},
);
</script>

<template>
	<Card style="width: 25rem; overflow: hidden">
		<template #title>{{ type }}</template>
		<template #subtitle>{{ zipCode }}</template>
		<template #content>
			<p class="m-0">{{ price }}</p>
			<p v-if="available">Disponible</p>
			<p v-else>{{ dateAvailable }}</p>
		</template>
		<template #footer>
			<div class="flex gap-4 mt-1">
				<Button
					v-if="!isFavorite"
					label="Ajouter Favoris"
					class="favorite"
					severity="danger"
					@click="saveToFavorites" />
				<Button
					v-else
					label="Supprimer Favoris"
					severity="danger"
					text
					@click="removeFromFavorites" />
			</div>
		</template>
	</Card>
</template>
