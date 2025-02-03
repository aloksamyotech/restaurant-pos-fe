import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/home.js')));

const POS = Loadable(lazy(() => import('views/POS')));
const Invoice = Loadable(lazy(() => import('views/POS/Components/invoice.js')));
const Modifiers = Loadable(lazy(() => import('views/Modifiers')));
const Categories = Loadable(lazy(() => import('views/Categories')));

const Order = Loadable(lazy(() => import('views/Order')));
const OrderView = Loadable(lazy(() => import('views/Order/orderView')));
const Items = Loadable(lazy(() => import('views/Items')));
const Ingredients = Loadable(lazy(() => import('views/Ingredients')));
const ExpenseType = Loadable(lazy(() => import('views/ExpenseType')));
const Expenses = Loadable(lazy(() => import('views/Expenses')));
const Employees = Loadable(lazy(() => import('views/Employees')));

const Customers = Loadable(lazy(() => import('views/Customers')));
const CustomersView = Loadable(lazy(() => import('views/Customers/customerView')));
const OverallReport = Loadable(lazy(() => import('views/Reports')));

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
          path: 'pos',
          element: <POS />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'pos/invoice/:invoiceId',
          element: <Invoice />
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
          path: 'order',
          element: <Order />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'order/orderview/:id',
          element: <OrderView />
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
          path: 'expenseType',
          element: <ExpenseType />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'overallReport',
          element: <OverallReport />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenses',
          element: <Expenses />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'employees',
          element: <Employees />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'customers',
          element: <Customers />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'customer/customerview/:id',
          element: <CustomersView />
        }
      ]
    }
  ]
};

export default MainRoutes;
