// assets
import {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers
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
  IconNotebook,
  IconPhoneCheck,
  IconUsers
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
    }]
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
      icon: icons.IconPhoneCheck,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Kitchen',
      type: 'item',
      url: '/dashboard/kitchen',
      icon: icons.IconNotebook,
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
      icon: icons.IconChecklist,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Items',
      type: 'item',
      url: '/dashboard/items',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Modifiers',
      type: 'item',
      url: '/dashboard/modifiers',
      icon: icons.IconPhoneCall,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Ingredients',
      type: 'item',
      url: '/dashboard/ingredients',
      icon: icons.IconMail,
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
      title: 'Calender',
      type: 'item',
      url: '/dashboard/calender',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Document Management',
      type: 'item',
      url: '/dashboard/document',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '10',
      title: 'Email Template',
      type: 'item',
      url: '/dashboard/emailtemplate',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    }
  ]
};



