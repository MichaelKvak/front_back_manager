<template>
    <div>
        <div v-if="isLoading"> Loading... </div>
        <div v-if="hasError">Error</div>
        <div v-if="!isLoading && !hasError">
            <div v-for="task in getTasksList" :key="task._id">
                <span>{{task.title}}</span> -
                <span>{{task.priority}}</span> -
                <button @click="onDelete(task._id)">X</button>           
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
    export default {
        name:'Home',

        computed: {
            ...mapGetters(['getTasksList','isLoading', 'hasError'])
        },

        methods: {
            ...mapActions(['loadTasks','deleteTasks']),
            onDelete(id){
                this.deleteTasks(id)
            }
        },

        mounted () {
            this.loadTasks()
        },
    }
</script>

<style lang="scss" scoped>

</style>