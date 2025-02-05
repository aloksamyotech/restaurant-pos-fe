import { POS, Portal, Food, Expenses, Report, People } from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [POS, Portal, Food, Expenses, Report, People].filter(Boolean)
};

export default menuItems;
