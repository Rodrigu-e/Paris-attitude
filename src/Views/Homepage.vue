<script setup>
import { ref, onMounted } from 'vue';

import axios from 'axios';

import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import Select from 'primevue/select';

import Card from '@/components/Card.vue';

const zipCode = ref(null);
const minPrice = ref(null);
const maxPrice = ref(null);
const propertyType = ref('Type de bien');
const selectedAvailability = ref('Disponibilité');
const propertyTypeList = ['Appartement', 'Studio', 'Maison', 'Châlet'];
const availability = ['Disponible', 'Indisponible'];
let posts = ref([]);
const filteredPosts = ref([]);

const submitForm = () => {
	filteredPosts.value = posts.value.filter((post) => {
		const matchesZipCode = zipCode.value ? post.zipCode.includes(zipCode.value) : true;
		const matchesMinPrice = minPrice.value ? post.price >= minPrice.value : true;
		const matchesMaxPrice = maxPrice.value ? post.price <= maxPrice.value : true;
		const matchesPropertyType =
			propertyType.value !== 'Type de bien' ? post.type === propertyType.value : true;
		const matchesAvailability =
			selectedAvailability.value === 'Disponible'
				? post.available
				: selectedAvailability.value === 'Indisponible'
				? !post.available
				: true;

		return (
			matchesZipCode &&
			matchesMinPrice &&
			matchesMaxPrice &&
			matchesPropertyType &&
			matchesAvailability
		);
	});
};

const getPosts = async () => {
	const { data } = await axios.get('./../api/dataTestTechnique.json');
	posts.value = data;
};

onMounted(() => {
	getPosts();
});
</script>

<template>
	<div class="searchBar">
		<InputGroup>
			<InputNumber placeholder="Code postale" v-model="zipCode" />
		</InputGroup>

		<InputGroup>
			<InputNumber placeholder="Min prix" v-model="minPrice" />
		</InputGroup>

		<InputGroup>
			<InputNumber placeholder="Max prix" v-model="maxPrice" />
		</InputGroup>

		<InputGroup>
			<Select v-model="propertyType" :options="propertyTypeList" :placeholder="propertyType" />
		</InputGroup>

		<InputGroup>
			<Select
				v-model="selectedAvailability"
				:options="availability"
				:placeholder="selectedAvailability" />
		</InputGroup>
		<InputGroup>
			<Button label="Submit" @click="submitForm" />
		</InputGroup>
		<RouterLink :to="{ path: '/favoris' }">Favoris</RouterLink>
	</div>

	<main>
		<Card v-for="(data, index) in filteredPosts" :key="index" :data="data" />
	</main>
</template>

<style>
.searchBar {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin: 0 auto;
	width: fit-content;
}
</style>
