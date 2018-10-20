<template>
    <div>
        <div class="container main-wrapper">
            <article v-for="(location, idx) in locations" :key="idx">
                <img :src="location.image" width="300px">
                <h1>{{ location.name }}</h1>
                <button class="button is-small is-danger" @click="deleteLocation(location.id)">
                    Delete
                </button>
            </article>

            <hr>

            <form @submit.prevent="addLocation(name, image)">
                <h2>Add a New Location</h2>
                <input v-model="name" placeholder="Location Name" class="input">
                <input v-model="image" placeholder="Location Image URL" class="input">
                <button type="submit" class="button is-success">Add New Location</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from '../main'

    export default {
        name: "CatsAdd",
        data () {
            return {
                locations: [],
                name: '',
                image: ''
            }
        },
        firestore () {
            return {
                locations: db.collection('locations').orderBy('createdAt')
            }
        },
        methods: {
            addLocation (name, image) {
                const createdAt = new Date()
                db.collection('locations').add({ name, image, createdAt })
                // Clear values
                this.name = ''
                this.image = ''
            },
            deleteLocation (id) {
                db.collection('locations').doc(id).delete()
            }
        }
    }
</script>

<style scoped>
    .main-wrapper{
        padding-top: calc(6rem + 106px);
        padding-bottom: 6rem;
    }
</style>
