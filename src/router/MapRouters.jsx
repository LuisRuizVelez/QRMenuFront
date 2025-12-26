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
import DrinkPresentation from "../pages/categories/drinkPresentation/DrinkPresentation";
import DrinkCategory from "../pages/categories/drink/DrinkCategory";
import Drink from "../pages/core/drink/Drink";
import Currency from "../pages/catalogs/currency/Currency";

const MAP_ROUTERS = [
    {
        code:'rest',
        name:'Restaurant',
        path:'/restaurant',
        groupingRoleIsRequired: true,
        component: <Restaurant />
    },
    {
        code:'rest',
        name:'Menu',
        path:'/menu',
        groupingRoleIsRequired: true,
        component: <Menu />
    },
    {
        code:'rest',
        name:'Platillos',
        path:'/dish',
        groupingRoleIsRequired: true,
        component: <Dish />
    },
    {
        code:'rest',
        name:'Bebidas',
        path:'/drink',
        groupingRoleIsRequired: true,
        component: <Drink />
    },




    {
        code:'categories',
        name:'Categorías de Restaurante',
        path:'/categories/restaurant',
        groupingRoleIsRequired: true,
        component: <RestaurantCategory />
    }, {
        code:'categories',
        name:'Categorías de Menú',
        path:'/categories/menu',
        groupingRoleIsRequired: true,
        component: <MenuCategory />
    }, {
        code:'categories',
        name:'Categorías de Patillos',
        path:'/categories/dish',
        groupingRoleIsRequired: true,
        component: <DishCategory />
    }, {
        code:'categories',
        name:'Atributos de Platillos',
        path:'/categories/dish_attributes',
        groupingRoleIsRequired: true,
        component: <DishAttributes />
    }, {
        code:'categories',
        name:'Presentación de los Platillos',
        path:'/categories/dish_presentation',
        groupingRoleIsRequired: true,
        component: <DishPresentation />
    }, {
        code:'categories',
        name:'Presentación del Bebidas',
        path:'/categories/drink_presentation',
        groupingRoleIsRequired: true,
        component: <DrinkPresentation />
    }, {
        code:'categories',
        name:'Categorías de la Bebida',
        path:'/categories/drink',
        groupingRoleIsRequired: true,
        component: <DrinkCategory />
    },





    {
        code:'config',
        name:'Países',
        path:'/categories/country',
        groupingRoleIsRequired: false,
        component: <Country />
    }, {
        code:'config',
        name:'Idiomas',
        path:'/categories/lang',
        groupingRoleIsRequired: false,
        component: <Lang />
    },{
        code:'config',
        name:'Monedas',
        path:'/categories/currency',
        groupingRoleIsRequired: false,
        component: <Currency />
    },




    {
        code:'firebase',
        name:'Proyectos',
        path:'/firebase/project',
        groupingRoleIsRequired: false,
        component: <FBProject />
    }, {
        code:'firebase',
        name:'Base de Datos',
        path:'/firebase/databases',
        groupingRoleIsRequired: false,
        component: <FBDatabase />
    }, {
        code:'firebase',
        name:'Paths de Componentes',
        path:'/firebase/child_paths',
        groupingRoleIsRequired: false,
        component: <FBChildPath />
    },



    {
        code:'security',
        name:'Usuarios',
        path:'/security/users',
        groupingRoleIsRequired: false,
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
        groupingRoleIsRequired: false,
        component: <Section />
    },
]



export default MAP_ROUTERS