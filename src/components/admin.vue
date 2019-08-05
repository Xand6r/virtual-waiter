<template>
    <div>
        <div v-for="(order,i) in orders" :key="i" class="container">
            <div class="items-wrapper">
                <div class="order-items">
                    <div class="dummy"><span class="title">ORDER FROM SEAT:{{seat}}</span><span class="attended"><i class="fa fa"></i></span></div>
                    <div v-for="(items,i) in order" :key="i" class="order-item">
                        
                        <span class="foodName">{{items.foodName}}</span>
                        <span class="price">{{items.currentPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{orders}} -->
    </div>
</template>

<script>
import io from "socket.io-client";
export default {
    data(){
        return{
            socket:null,
            orders:[],
            seat:null
        }
    },
    mounted(){
        this.socket=io("/");
        this.socket.on("newOrder",(newOrder,seat)=>{
            this.seat=seat;
            this.orders.push(newOrder);
        });
        let vue=this;
        
        let month=new Date().getMonth();
        let year=new Date().getFullYear();
        let day=new Date().getDate();
        
        fetch('/ordersfortoday', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({month,year,day})
            }).then(res=>res.json()).then(function(res){
                console.log(vue.orders=res.slice())
            });
    }
}
</script>

<style scoped>
    .container{
        /* width: 98vw; */
        min-height: 20vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .items-wrapper{
        background-color: white;
        width: 55vw;
    }

    .header{
        text-align: center;
    }

    .dummy{
        border: 1.5px solid black;
        display: flex;
        justify-content: space-between;

    }
    
    .order-item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-left:1px solid black;
        border-right:1px solid black;
        border-bottom:1px solid black;
        padding:5px 15px;
    }


</style>


