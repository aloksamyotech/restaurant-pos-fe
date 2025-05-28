import { useCurrency } from '../../common/CurrencyContext';

const CurrencySelector = () => {
  const { setCurrency } = useCurrency();

  return (
    <select onChange={(e) => setCurrency(e.target.value)}>
      <option value="Rs.">Rs.</option>
      <option value="$">$</option>
      <option value="€">€</option>
      <option value="£">£</option>
    </select>
  );
};

export default CurrencySelector;
