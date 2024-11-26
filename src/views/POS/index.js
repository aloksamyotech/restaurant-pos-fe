import SearchBar from "./SearchBar/SearchBar";
import DishCard from "./DishCard/DishCard";
import DishesGrid from "./Dishes/DishesGrid";
import sandwich from 'assets/images/sandwich.jpg'






const POS=() =>{
  const dishes = [
    { id: 1, name: "sandwich", image: sandwich, price: 15 },
    { id: 2, name: "sandwich", image: sandwich, price: 20 },
    { id: 3, name: "sandwich", image: sandwich, price: 25 },
  ];
  return(
    <>
   
    <SearchBar/>
    <div>
    <DishCard
        name="Sandwich"
        
        price={15}
      />
    </div>
    <div>
      <DishesGrid dishes={dishes} />
    </div>
    
    </>
  )
}
export default POS;