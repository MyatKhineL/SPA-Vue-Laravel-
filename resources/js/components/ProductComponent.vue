<template>
    <div class="container my-5">
       <div class="row justify-content-end mb-3">
           <div class="col-4">
               <div class="btn btn-primary" @click="create">
                   <i class="fas fa-plus-circle"></i>    Create
               </div>
           </div>
           <div class="col-4">
               <form>
                   <div class="input-group">
                       <input type="text" placeholder="Search" class="form-control">

                       <div class="input-group-append">
                           <button type="submit" class="btn btn-primary">
                               <i class="fas fa-search"></i>
                           </button>
                       </div>
                   </div>

               </form>
           </div>
           </div>
        <div class="row">
            <!--- Create !-->
            <div class="col-4">
                <div class="card">
                    <h3 class="card-header">
                        {{ isEditMode ? 'Edit':'Create'}}
                    </h3>
                    <div class="card-body">
                        <form @submit.prevent="isEditMode ? update() :store() ">
                            <div class="form-group">
                                <label>Name </label>
                                <input type="text" v-model="product.name" class="form-control">
                            </div>
                            <div class="form-group my-3">
                                <label>Price </label>
                                <input type="text"  v-model="product.price" class="form-control">
                            </div>
                            <button class="btn btn-primary" type="submit">
                                <i class="fas fa-save mr-1"></i> Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <!--- Create End !-->
            <!---Table !-->
            <div class="col-8">
                <table class="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{product.id}}</td>
                        <td>{{product.name}}</td>
                        <td>{{product.price}}</td>
                        <td>
                            <button class="btn btn-warning" @click="edit(product)">
                                <i class="fas fa-pencil-alt"></i>    Edit
                            </button>
                            <button class="btn btn-danger"  @click="destroy(product.id)" >
                                <i class="fas fa-trash-alt"></i>     Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--- Table End !-->

        </div>
       </div>


</template>

<script>

export default {
    name:'ProductComponent',

    data() {
        return {
            isEditMode:false,
            products:{},
            product:{
                id:'',
                name:'',
                price:''
            }
        }
    },

    methods: {
         view(){
             axios.get('/api/product')
                 .then((response)=>{
                     this.products = response.data
                 })
                 .catch(error => console.log(error));
         },
         create(){
             this.isEditMode = false
             this.product.id ='';
             this.product.name = '';
             this.product.price = '';
         },
         store() {
             axios.post('/api/product',this.product)
             .then(response=>{
                 this.view();
                 this.product.id = '';
                 this.product.name = '';
                 this.product.price = '';
             })
        },
        edit(product){
            this.isEditMode = true
            this.product.id = product.id;
            this.product.name = product.name;
            this.product.price = product.price;
        },
        update(){
             axios.put(`/api/product/${this.product.id}`,this.product)
             .then(response =>{
                 this.view();
                 this.product.id = '';
                 this.product.name = '';
                 this.product.price = '';
             } )
                 .catch(error => console.log('Error'))

        },
        destroy(id){
             if(!confirm('Are u sure to delete ?')){
                 return;
             }
             axios.delete(`/api/product/${id}`)
             .then(res=>this.view());
        }
    },



    created() {
         this.view();
    }
}
</script>

