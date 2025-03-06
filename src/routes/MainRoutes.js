import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { getPermissionFromToken } from 'core/apis/common';
import { Navigate } from 'react-router';
// dashboard routing

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/home.js')));
const Table = Loadable(lazy(() => import('views/Table')));
const POS = Loadable(lazy(() => import('views/POS')));
const Invoice = Loadable(lazy(() => import('views/POS/Components/invoice.js')));
const Modifiers = Loadable(lazy(() => import('views/Modifiers')));
const Categories = Loadable(lazy(() => import('views/Categories')));
const ExpenseReport = Loadable(lazy(() => import('views/ExpenseReport')));
const Order = Loadable(lazy(() => import('views/Order')));
const OrderView = Loadable(lazy(() => import('views/Order/orderView')));
const Items = Loadable(lazy(() => import('views/Items')));
const Ingredients = Loadable(lazy(() => import('views/Ingredients')));
const ExpenseType = Loadable(lazy(() => import('views/ExpenseType')));
const Expenses = Loadable(lazy(() => import('views/Expenses')));
const Employees = Loadable(lazy(() => import('views/Employees')));
const EmployeeView = Loadable(lazy(() => import('views/Employees/viewPage')));
const Customers = Loadable(lazy(() => import('views/Customers')));
const CustomersView = Loadable(lazy(() => import('views/Customers/customerView')));
const SingleKitchenOrder = Loadable(lazy(() => import('views/Kitchen/kitchenOrder')));
const OverallReport = Loadable(lazy(() => import('views/Reports')));
const Kitchen = Loadable(lazy(() => import('views/Kitchen')));

// ==============================|| MAIN ROUTING ||============================== //
const userPermissions = getPermissionFromToken();
const ProtectedRoute = ({ element, requiredPermission }) => {
  if (requiredPermission === 'dashboard') return element;
  return userPermissions.includes(requiredPermission) ? element : <Navigate to="/" replace />;
};

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

          element: <ProtectedRoute element={<POS />} requiredPermission="POS" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'pos/invoice/:invoiceId',

          element: <ProtectedRoute element={<Invoice />} requiredPermission="POS" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'modifiers',

          element: <ProtectedRoute element={<Modifiers />} requiredPermission="Modifiers" />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'order',

          element: <ProtectedRoute element={<Order />} requiredPermission="Order" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'order/orderview/:id',

          element: <ProtectedRoute element={<OrderView />} requiredPermission="Order" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'employees/employeeview/:id',

          element: <ProtectedRoute element={<EmployeeView />} requiredPermission="Employees" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'categories',

          element: <ProtectedRoute element={<Categories />} requiredPermission="Categories" />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'ingredients',

          element: <ProtectedRoute element={<Ingredients />} requiredPermission="Ingredients" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'items',

          element: <ProtectedRoute element={<Items />} requiredPermission="Items" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenseType',

          element: <ProtectedRoute element={<ExpenseType />} requiredPermission="Expense Type" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'overallReport',

          element: <ProtectedRoute element={<OverallReport />} requiredPermission="Overall Report" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenses',

          element: <ProtectedRoute element={<Expenses />} requiredPermission="Expenses" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'employees',

          element: <ProtectedRoute element={<Employees />} requiredPermission="Employees" />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'customers',

          element: <ProtectedRoute element={<Customers />} requiredPermission="Customers" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'customer/customerview/:id',

          element: <ProtectedRoute element={<CustomersView />} requiredPermission="Customers" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'kitchen/singleKitchenOrder/:id',

          element: <ProtectedRoute element={<SingleKitchenOrder />} requiredPermission="Kitchen" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenseReport',

          element: <ProtectedRoute element={<ExpenseReport />} requiredPermission="Expense Report" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'kitchen',

          element: <ProtectedRoute element={<Kitchen />} requiredPermission="Kitchen" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'table',

          element: <ProtectedRoute element={<Table />} requiredPermission="Table" />
        }
      ]
    }
  ]
};

export default MainRoutes;
