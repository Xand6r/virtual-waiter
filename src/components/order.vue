<template>
    <div class="wrapper" >
        <div class="navigation">
            <div class="title">
                <router-link to="/" class="unset"><h3 class="restaurant">SAVOUR</h3></router-link>
            </div>
            <div class="nav-items large">
                <!-- <span class="nav-item"> <a class="feedback" href="/feedback/feedback.html">Feedback</a></span> -->
                <span class="nav-item" :class="{active:current!='food'}" @click="changeCurrent('food')" >Food</span>
                
                <span class="nav-item" :class="{active:current!='drinks'}" @click="changeCurrent('drinks')">Drinks</span>
                <i @click="cartOpen=!cartOpen" :class="{fullcart:cart.length>0,cartanimate:cart.length>0}" class="scale  fa fa-shopping-cart"></i>
                <i class="incart">{{cart.length}}</i>
            </div>
            <div class="small-screen">
                <span @click="cartOpen=!cartOpen" class="small-screen small-item pointer"><i :class="{fullcart:cart.length>0,cartanimate:cart.length>0}" class="scale fa fa-shopping-cart"></i><i class="number">{{this.cart.length}}</i></span>
                <span class="small-screen small-item"><i class="fa fa-2x fa-bars dropbutton" @click="changeSlide()"></i></span>
            </div>

        </div>
        <div :class="{slidedown:slideOn,hide:!slideOn}" ref="dropdown" class="drop-down ">
            <div class="dropdown-wrapper">
                <div class="dropdown-item" :class="{active:current=='food'}" @click="changeCurrent('food')">Food</div>
                <div class="dropdown-item" :class="{active:current=='drinks'}" @click="changeCurrent('drinks')">Drinks</div>
                <!-- <div class="dropdown-item" ><a class="feedback" href="/feedback/feedback.html">Feedback</a></div> -->
            </div>
        </div>
        <div class="items food" v-if="current=='food'">
            <item class="fadeIn" v-for="(foodItem,i) in foodItems" :key="i" @add="addToCart" :foodInfo="foodItem"/>
        </div>
        <div class="items drinks" v-if="current=='drinks'">
            <item class="fadeIn" v-for="(foodItem,i) in drinkItems" :key="i" @add="addToCart" :foodInfo="foodItem"/>
        </div>
        <cart @orderPlaced="emitOrder" :cartItems="cart" @closed="cartOpen=false" @remove="handleRemove" v-if="cartOpen" class="cart"/>
    </div>
</template>


<script>
import item from "./item.vue"
import cart from "./cart.vue"
import io from "socket.io-client"
import {foodItemsArray} from './edibleItems'
import {drinkItemsArray} from './edibleItems'

export default {
    data(){
        return{
            foodItems:foodItemsArray,
            drinkItems:drinkItemsArray,
            socket:null,
            cart:[],
            current:"food",
            slideOn:false,
            cartOpen:false,
        }
    },
    mounted(){
        this.socket=io("/");
    },
    methods:{
        addToCart(state){
            this.cart.push(state);
        },
        changeCurrent(arg){
            this.current=arg;
        },
        changeSlide(){
            this.slideOn=!this.slideOn;
        },
        handleRemove(index){
            this.cart=this.cart.filter((item,i)=>i!=index)
        },
        emitOrder(seat){
            this.socket.emit("order",this.cart,seat);
            this.cart=[];
            this.cartOpen=false;
        }
    },
    components:{
        item,
        cart
    }
}
</script>

<style scoped>
.feedback{
    text-decoration:none;
    color: #fff;
}

h3{
    color:rgb(236, 229, 229);
    transition-duration: 0.5s;
}

h3:hover{
    color:white;
}

.wrapper{
      background-image: linear-gradient(rgba(0, 0, 0, 0.479), rgba(0, 0, 0, 0.445)) url("../assets/background.jpg");
  /* background-repeat: no-repeat; */
  background-size: 220vh;
  background-attachment:fixed;
  background-position: 50% 60%;
  /* min-height: 100vh; */
  background-color: rgba(37, 37, 37,0.35);
  background-blend-mode: darken;
}

.nav-item{
    transition-duration: 1s;
}

.nav-item:hover{
    color: white;
}

.dropdown-item{
    transition-duration: 1s;
}

.dropdown-item:hover{
    color: white;
}

.items{
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
}
.navigation{
    display: flex;
    width: 95%;
    margin-left: 3%;
    color:white;
    padding-top: 1%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
}

.nav-items{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 30%;
    align-items: center;
    cursor: pointer;
}

.nav-item{
    text-align: center;
    border-radius: 4px;
    height: 30px;
    min-width: 60px;
    padding-top: 10px;
    padding-left:8px;
    padding-right: 8px; 
    font-weight: 600;
    background-color: hsla(0, 23%, 95%,.1 );
    /* box-shadow: 2px 2px 5px black; */
    transition-duration: 500ms;
}

.nav-item:active{
    color: rgb(177, 177, 177);
    transform: scale(0.95);
}

.active{
    color: hsl(0, 0%, 60%);
}
.scale{
    transform: scale(1.5);
}

.fullcart{
    color: rgb(45, 173, 90);
}
.incart{
    padding: 0;
    margin-left:-9%;
}

.dropbutton{
    cursor: pointer;
    transition-duration: 0.5s;
}


.dropbutton:active{
    transform: scale(1.1)
}

.dropdown-wrapper{
    color: white;
    text-align: center;
    text-transform: capitalize;
}

.dropdown-item{
    cursor: pointer;
    padding:5px;
    box-shadow: 2px 0.3px 5px white,2px 0.3px 5px green;
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
}

.number{
    padding: 0 10px;
}

@keyframes slidedown {
    from{
        transform: scale3d(1,0,1)
    }
    to{
        transform: scale3d(1,1,1)
    }
}

.slidedown{
    animation: slidedown 2s ease-in fowards;
}

.hide{
    display:none;
}
.small-screen{
    display:flex;
    flex-direction: row;
    align-items: center;
}

.small-item{
    padding:0 15px;
}

@media (max-width : 800px){
    .large{
        display: none;
    }
}
@media (min-width : 800px){
    .small-screen{
        display: none;
    }
}
@keyframes identifier {
    
}
.cart{
    position: fixed;
    top: 0;
}



.unset{
    text-decoration: none;
    color: white;
}

@keyframes cartani {
    0%{
        transform: scale(1.2) rotate(0deg)
    }
    25%{
        transform: scale(2) rotate(30deg);
    }
    50%{
        transform: scale(2) rotate(-30deg);
    }
    75%{
        transform: scale(2) rotate(30deg);
    }
    100%{
        transform: scale(1.2) rotate(0deg)
    }
}

.cartanimate{
    animation: cartani 2s ease-in  infinite forwards;
}

.pointer{
    cursor: pointer;
}

.restaurant{
    font-family: 'Yellowtail', cursive;
    font-size: 2.0em;
}

.fadeIn{
    animation: fadein 1s ease-in;
}

@keyframes fadein {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

</style>

