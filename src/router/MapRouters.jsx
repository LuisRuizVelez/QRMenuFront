import Restaurant from "../pages/core/restaurant/Restaurant";
import RestaurantCategory from "../pages/categories/restaurantCategory/RestaurantCategory";
import Lang from "../pages/catalogs/lang/Lang";
import FBProject from "../pages/firebase/project/FBProject";
import FBDatabase from "../pages/firebase/database/FBDatabase";
import FBChildPath from "../pages/firebase/childPaths/FBChildPath";
import User from "../pages/security/user/User";
import Role from "../pages/security/role/Role";
import Section from "../pages/ui/section/Section";
import Country from "../pages/catalogs/country/Country";
import MenuCategory from "../pages/categories/menuCategory/MenuCategory";
import DishCategory from "../pages/categories/dish/DishCategory";
import DishAttributes from "../pages/categories/dishAttributes/DishAttributes";
import DishPresentation from "../pages/categories/dishPresentation/DishPresentation";
import Menu from "../pages/core/menu/Menu";
import Dish from "../pages/core/dish/Dish";

const MAP_ROUTERS = [
    {
        code:'rest',
        name:'Restaurant',
        path:'/restaurant',
        component: <Restaurant />
    },
    {
        code:'rest',
        name:'Menu',
        path:'/menu',
        component: <Menu />
    },
    {
        code:'rest',
        name:'Platillos',
        path:'/dish',
        component: <Dish />
    },




    {
        code:'categories',
        name:'Categorías de Restaurante',
        path:'/categories/restaurant',
        component: <RestaurantCategory />
    }, {
        code:'categories',
        name:'Categorías de Menú',
        path:'/categories/menu',
        component: <MenuCategory />
    }, {
        code:'categories',
        name:'Categorías de Patillos',
        path:'/categories/dish',
        component: <DishCategory />
    }, {
        code:'categories',
        name:'Atributos de Platillos',
        path:'/categories/dish_attributes',
        component: <DishAttributes />
    }, {
        code:'categories',
        name:'Presentación de los Platillos',
        path:'/categories/dish_presentation',
        component: <DishPresentation />
    },





    {
        code:'config',
        name:'Países',
        path:'/categories/country',
        component: <Country />
    }, {
        code:'config',
        name:'Idiomas',
        path:'/categories/lang',
        component: <Lang />
    },




    {
        code:'firebase',
        name:'Proyectos',
        path:'/firebase/project',
        component: <FBProject />
    }, {
        code:'firebase',
        name:'Base de Datos',
        path:'/firebase/databases',
        component: <FBDatabase />
    }, {
        code:'firebase',
        name:'Paths de Componentes',
        path:'/firebase/child_paths',
        component: <FBChildPath />
    },



    {
        code:'security',
        name:'Usuarios',
        path:'/security/users',
        component: <User />
    }, {
        code:'security',
        name:'Roles de Usuario',
        path:'/security/role',
        component: <Role />
    },


    {
        code:'ui',
        name:'Secciones',
        path:'/ui/section',
        component: <Section />
    },
]



export default MAP_ROUTERS