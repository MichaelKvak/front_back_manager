<template>
<div>
    <div v-if="isLoading"> Loading... </div>
    <div v-if="hasError">Error</div>
    <div>
        <label>
          Task title
          <input type="text" v-model="taskTitle" />
        </label>
        <br />
        <label>
          Task priority
          <input type="number" v-model.number="taskPriority" />
        </label>
        <div>
            <button @click="onSave" :disabled="!isDataValid">Save</button>
        </div>
        <div v-if="errorMessage">{{errorMessage}}</div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
    export default {
        name:'Edit',

        data() {
            return {
                taskTitle: null,
                taskPriority:null,
                errorMessage:null
            }
        },

        computed: {
            ...mapGetters(['isLoading','hasError']),
            isDataValid(){
                return this.taskTitle&&(this.taskPriority>=1&&this.taskPriority<=10)
            }
        },

        methods: {
            ...mapActions(['createTask']),
            async onSave() {
                this.errorMessage=''
                try{
                    await this.createTask({ 
                        taskTitle:this.taskTitle, 
                        taskPriority :this.taskPriority
                    })
                    this.$router.push({name:'home'})
                }
                catch{
                    this.errorMessage='Saving error'
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>