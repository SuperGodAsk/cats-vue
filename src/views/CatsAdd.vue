<template>
    <div>
        <div class="container main-wrapper">
            <h1>Добавление котика</h1>
            <cats-add-form/>
            <cats-add-list/>
        </div>
    </div>
</template>

<script>
    import CatsAddForm from "../components/CatAdd/CatsAddForm";
    import CatsAddList from "../components/CatAdd/CatsAddList"
    export default {
        name: "CatsAdd",
        components: {CatsAddForm, CatsAddList},
    }
</script>
