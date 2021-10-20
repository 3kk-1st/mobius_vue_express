<template>
    <div>
        <v-card>
            <v-btn elevation="2" v-on:click="goToVueGraph">Go to Vue Graph</v-btn>
        </v-card>
        <p>HI</p>
        <v-card>
            <v-btn elevation="2" v-on:click="goToUserList">Go to User List</v-btn>
        </v-card>
    </div>
</template>

<script>

export default ({
    data() {
        return {
            
        }
    },
    methods: {
        goToVueGraph () {
            this.$router.push({ name: 'VueGraph'})
        },
        goToUserList () {
            this.$router.push({ name: 'UserList' })
        }
    }
})
</script>
