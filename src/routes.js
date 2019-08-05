import index from "./components/index.vue"
import order from "./components/order.vue"
import admin from "./components/admin.vue"
import feedback from "./components/feedback.vue"

export default [
    {path:"/",component:index},
    {path:"/order",component:order},
    {path:"/admin",component:admin},
    {path:"/feedback",component:feedback}
]