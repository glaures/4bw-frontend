import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from "@/views/SignUpView.vue";
import LinkedInSignUpCallback from "@/components/callbacks/LinkedInSignUpCallback.vue";
import ProfileView from "@/views/ProfileView.vue";
import HomeView from "@/views/HomeView.vue"
import EditOfferView from "@/views/EditOfferView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistrationTypeSelectionView from "@/views/RegistrationTypeSelectionView.vue";
import CompanyRegistrationView from "@/views/CompanyRegistrationView.vue";
import SupplierRegistrationView from "@/views/SupplierRegistrationView.vue";
import SearchView from "@/views/SearchView.vue";
import PlansOverviewView from "@/views/PlansOverviewView.vue";
import SupplierDetailView from "@/views/SupplierDetailView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import PublicHomeView from "@/views/PublicHomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignUpView
    },
    {
      path: '/callbacks/linkedin',
      name: 'linkedInCallback',
      props: true,
      component: LinkedInSignUpCallback
    },
    {
      path: '/profiles/:nameId',
      name: 'profile',
      props: true,
      component: ProfileView
    },
    {
      path: '/h/:nameId',
      name: 'publicHome',
      props: true,
      component: PublicHomeView
    },
    {
      path: '/offers/:offerId?',
      name: 'editOffer',
      props: true,
      component: EditOfferView
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: LoginView
    },
    {
      path: '/registration-switch',
      name: 'registrationTypeSelection',
      props: true,
      component: RegistrationTypeSelectionView
    },
    {
      path: '/registration/company',
      name: 'companyRegistration',
      props: true,
      component: CompanyRegistrationView
    },
    {
      path: '/registration/supplier',
      name: 'supplierRegistration',
      props: true,
      component: SupplierRegistrationView
    },
    {
      path: '/search',
      name: 'search',
      props: true,
      component: SearchView
    },
    {
      path: '/supplier/:id?',
      name: 'supplierDetail',
      props: true,
      component: SupplierDetailView
    },
    {
      path: '/plans',
      name: 'plansOverview',
      props: true,
      component: PlansOverviewView
    },
    {
      path: '/checkout',
      name: 'checkout',
      props: true,
      component: CheckoutView
    },
    {
      path: '/supplier-contact/:id?',
      name: 'supplierContact',
      props: true,
      component: () => import('../views/SupplierContactView.vue')
    },
    {
      path: '/projects',
      name: 'projectManagement',
      component: () => import('../views/ProjectManagementView.vue')
    },
    {
      path: '/project/:id?',
      name: 'projectDetail',
      component: () => import('../views/ProjectDetailView.vue')
    }
  ]
})

export default router
