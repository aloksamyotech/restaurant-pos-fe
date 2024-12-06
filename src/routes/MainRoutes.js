import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/home.js'))); 
const Sales = Loadable(lazy(() => import('views/Sales')));  
const POS = Loadable(lazy(() => import('views/POS')));    
const Modifiers = Loadable(lazy(() => import('views/Modifiers')));
const Categories = Loadable(lazy(() => import('views/Categories')));    
const Kitchen = Loadable(lazy(() => import('views/Kitchen')));  
const Items = Loadable(lazy(() => import('views/Items')));
const Ingredients = Loadable(lazy(() => import('views/Ingredients')));
const Task = Loadable(lazy(() => import('views/Task')));
const EmailTemplates = Loadable(lazy(() => import('views/EmailTemplates')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Calender = Loadable(lazy(() => import('views/Calender')));
const AddTemplates = Loadable(lazy(() => import('views/EmailTemplates/AddTemplates')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'sales',
          element: <Sales />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'pos',
          element: <POS/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'modifiers',
          element: <Modifiers />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'kitchen',
          element: <Kitchen/>
        }
      ]
    },
     {
      path: 'dashboard',
      children: [
        {
          path: 'categories',
          element: <Categories />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'task',
          element: <Task />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'ingredients',
          element: <Ingredients />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'items',
          element: <Items />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'calender',
          element: <Calender />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document',
          element: <Document />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'emailtemplate',
          element: <EmailTemplates />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'emailtemplate/addTemplates',
          element: <AddTemplates />
        }
      ]
    }
  ]
};

export default MainRoutes;
