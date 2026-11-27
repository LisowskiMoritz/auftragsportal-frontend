import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuftragsuebersichtView from '../views/AuftragsuebersichtView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView,
        },
        {
            path: '/auftraege',
            component: AuftragsuebersichtView,
        },

    ],
})

export default router