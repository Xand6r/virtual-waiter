<template>
    <div class="body">
        <div class="container">
            <div class="header">feedback form</div>
            <div class="text-area">
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>


<style scoped>
*{
    color: rgb(25, 25, 46);
}

.header{
    font-weight:bolder;
    text-transform: capitalize;
    text-align: center;
    padding: 10px;
}

.body{
    display: flex;
    justify-content: center;
    align-items: center;
}

.container{
    margin-top: 20vh;
    width: 75vw;
    height: 50vh;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
