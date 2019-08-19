<template>
    <div class="wrapper" @click.self="close">
        <div  class="cart-container fadein">

            <div class="cartheader">
                <span class="title">Plate</span>
                <div class="number"> <label for="tablenumber">Table:</label> <input v-model="tableNumber" id="tablenumber" name="tablenumber" class="tablenumber" required placeholder="No"></div>
            </div>

            <div class="dummy"></div><!--just to add the first margin-top-->
            <div  class="cart-items">
                <div v-for="(cartItem,i) in cartItems" :key="i" class="cart-item">
                    {{i}}
                    <span class="name">{{cartItem.foodName}}</span>
                    <span class="price">N{{cartItem.currentPrice}}</span>
                    <span @click='remove(i)' class="remove"><i class="fa fa-remove"></i></span>
                </div>
                <div class="total-price">Total:N{{totalPrice}}</div>
                <button @click="order">order</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props:["cartItems"],
    data(){
        return{
            tableNumber:null
        }
    },
    computed:{
        totalPrice(){
            return this.cartItems.reduce((previous,current)=>{
                return previous+current['currentPrice']
            },0)
            
        }
    },
    methods:{
        order(){
            if(this.cartItems.length<1){
                alert("please put an item in the cart");
                return;
            }
            
            if(this.tableNumber && prompt("Are you sure to place order (y/n)")=="y" ){
                this.$emit("orderPlaced",this.tableNumber);
                alert("order placed, wait a minute your food will be with you shortly. thank you for eating with us")
                return;
            }
            alert("please enter a table number");
        },
        close(){
            this.$emit("closed");
        },
        remove(index){
            this.$emit("remove",index);
        }
    }
}
</script>

<style scoped>

label{
    margin-top: 13px;
    font-weight: bold;
}

input.tablenumber{
    width: 20px;
    margin-top: 15px;
}

.cartheader{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

.number{
    display: flex;
    justify-content: center;
    align-items: center;
}

.remove{
    cursor: pointer;
}

.wrapper{
    box-sizing: border-box;
    position: absolute;
    width: 98vw;
    height: 100vh;
    background-color: hsla(0, 0%, 0%, .7);
    background-blend-mode: overlay;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cart-container{
    width: 70vw;
    max-width: 500px;
    background: white;
    box-shadow: 2px 2px 5px black,-2px -4px 10px black;
    border-radius: 9px;
    padding: 50px;
}

.cart-items{
    display: flex;
    flex-direction: column;
}

.total-price{
    display: flex;
    border-left:1px solid black;
    border-right:1px solid black;
    border-bottom:1px solid black;
    padding:5px 15px;
    justify-content: flex-end;
    font-weight: bold;
}

.cart-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-left:1px solid black;
    border-right:1px solid black;
    border-bottom:1px solid black;
    padding:5px 15px;
}

.dummy{
    border-bottom: 1.5px solid black;
}

span{
    font-weight: 600;
    color: rgb(43, 43, 63);
    text-transform: capitalize;
}

button{
    padding: 7px;
    margin-top: 5%;
    cursor: pointer;
    max-width: 200px;
    align-self: center;
    min-width: 90px;
    color:white;
    font-weight: 600;
    background-color: rgb(8, 151, 8);
    text-transform: capitalize;
    border-radius: 5px;
    outline: none;
}

button:active{
    outline: unset;
}

.title{
    display: block;
    margin: 3%;
    margin-bottom:10px;
    width: 100%;
    text-align: center;
    font-size: 200%;
}

.fadein{
    animation: fadeIn 2s ease-in fowards;
}

@keyframes fadeIn {
    from{
        opacity: 0;
    }
    to{
        opacity: 1
    }
}
</style>
