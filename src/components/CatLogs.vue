<template>
    <div class="row mt-5">
        <div class="col-md-12">
            <ul class="list-group">
                <li
                    class="list-group-item mb-3"
                    v-for="log in logs"
                    :class="{
                        'list-group-item-danger' : !log.type,
                        'list-group-item-success' : log.type
                    }"
                >{{log.text}}  [{{ log.date.toLocaleString() }}]</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CatLogs",
        props:{
            logs: Array
        },
    }
</script>

<style scoped>

</style>