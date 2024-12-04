import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/home.js'))); 
const LeadManagement = Loadable(lazy(() => import('views/Lead')));  //SALES ORDER
const ContactManagement = Loadable(lazy(() => import('views/Contact')));  //link of contact--below change to pos
const POS = Loadable(lazy(() => import('views/POS')));   //New POS Created 
const Call = Loadable(lazy(() => import('views/Calls')));
const Categories = Loadable(lazy(() => import('views/Categories')));    //link of policy--below change to pos
const Kitchen = Loadable(lazy(() => import('views/Kitchen')));  // New Kitchen Created 
const Metting = Loadable(lazy(() => import('views/Metting')));
const Email = Loadable(lazy(() => import('views/Email')));
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
          path: 'lead',
          element: <LeadManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'contact',
          element: <POS/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'call',
          element: <Call />
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
          path: 'email',
          element: <Email />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'meeting',
          element: <Metting />
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
