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
            <button @click="onSave" :disabled="!isDataValid">{{saveBtnTitle}}</button>
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
            },
            isEditing(){
                return !!this.$route.params.id
            },
            saveBtnTitle(){
                return this.isEditing?'Save':'Create'
            }
        },

        methods: {
            ...mapActions(['createTask','getTaskById','updateTask']),
            async onSave() {
                this.errorMessage=''
                try{
                    if(this.isEditing){
                        await this.updateTask({ 
                            taskTitle:this.taskTitle, 
                            taskPriority :this.taskPriority
                        })
                    }
                    else{
                        await this.createTask({ 
                            taskTitle:this.taskTitle, 
                            taskPriority :this.taskPriority
                        })
                    }
                    this.$router.push({name:'home'})
                }
                catch{
                    this.errorMessage='Saving error'
                }
            }
        },

        async mounted () {
            if(this.isEditing){
                try{
                    const editedObj=await this.getTaskById(this.$route.params.id)
                    this.taskTitle=editedObj.title
                    this.taskPriority=editedObj.priority
                }
                catch{
                    this.errorMessage='Fetching edited object error'
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>