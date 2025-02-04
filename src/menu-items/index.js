import { POS, Portal, Food, Expenses, Report, People } from './dashboard';
import { getPermissionFromToken } from 'core/apis/common';

// ==============================|| MENU ITEMS ||============================== //
const Permission = getPermissionFromToken();

const menuItems = {
  items: [
    Permission?.includes('POS') && POS,
    Permission?.includes('Portal') && Portal,
    Permission?.includes('Food') && Food,
    Permission?.includes('Expenses') && Expenses,
    Permission?.includes('Report') && Report,
    Permission?.includes('People') && People
  ]
};

export default menuItems;
