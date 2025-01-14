// assets
import FoodBankIcon from '@mui/icons-material/FoodBank';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EmojiFoodBeverage from '@mui/icons-material/EmojiFoodBeverage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Payments from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReorderSharpIcon from '@mui/icons-material/ReorderSharp';

import {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  // IconCategoryFilled,
  IconNotebook,
  IconPhoneCheck,
  IconUsers,
  IconClipboardList
} from '@tabler/icons';

// constant
const icons = {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  // IconCategoryFilled,
  IconNotebook,
  IconPhoneCheck,
  IconUsers,
  IconClipboardList,
  FoodBankIcon,
  CategoryIcon,
  FastfoodIcon,
  EmojiFoodBeverage,
  AccountCircleIcon,
  AccountBalanceWallet,
  Payments,
  RestaurantIcon,
  PointOfSaleIcon,
  ReorderSharpIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export const dashboard = {
  title: 'Restaurant POS',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: '01',
      title: 'Sales',
      type: 'item',
      url: '/dashboard/sales',
      icon: icons.IconAntennaBars5,
      breadcrumbs: false
    }
  ]
};

export const dashboard1 = {
  title: 'Portal',
  type: 'group',
  children: [
    {
      id: '02',
      title: 'POS',
      type: 'item',
      url: '/dashboard/pos',
      icon: icons.PointOfSaleIcon,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Kitchen',
      type: 'item',
      url: '/dashboard/kitchen',
      icon: icons.RestaurantIcon,
      breadcrumbs: false
    },
    {
      id: '13',
      title: 'Order',
      type: 'item',
      url: '/dashboard/order',
      icon: icons.ReorderSharpIcon,
      breadcrumbs: false
    }
  ]
};
export const dashboard2 = {
  title: 'FOOD',
  type: 'group',
  children: [
    {
      id: '04',
      title: 'Categories',
      type: 'item',
      url: '/dashboard/categories',
      icon: icons.CategoryIcon,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Items',
      type: 'item',
      url: '/dashboard/items',
      icon: icons.FoodBankIcon,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Modifiers',
      type: 'item',
      url: '/dashboard/modifiers',
      icon: icons.FastfoodIcon,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Ingredients',
      type: 'item',
      url: '/dashboard/ingredients',
      icon: icons.EmojiFoodBeverage,
      breadcrumbs: false
    }
  ]
};
export const dashboard3 = {
  title: 'Expenses',
  type: 'group',
  children: [
    {
      id: '08',
      title: 'Expense Type',
      type: 'item',
      url: '/dashboard/expenseType',
      icon: icons.AccountBalanceWallet,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Expenses',
      type: 'item',
      url: '/dashboard/expenses',
      icon: icons.Payments,
      breadcrumbs: false
    }
  ]
};
export const dashboard4 = {
  title: 'People',
  type: 'group',
  children: [
    {
      id: '10',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },

    {
      id: '12',
      title: 'Customers',
      type: 'item',
      url: '/dashboard/customers',
      icon: icons.AccountCircleIcon,
      breadcrumbs: false
    }
  ]
};
