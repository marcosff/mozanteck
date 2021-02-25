import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Parts from '@/components/Parts'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            components: {
                default: Main
            }
        },
        {
            name: 'parts',
            path: '/parts',
            components: {
                default: Parts
            }
        },
    ]
})

export default router