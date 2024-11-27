import SearchBar from "./Components/SearchBar";
import DishesGrid from "./Components/DishesGrid";
import { Container,Grid, Paper, Typography } from "@mui/material";
import dishes from "./Components/Dishes";
// import cart from "./Components/cart";



const POS=() =>{
 
  return(
    <>
   
  
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        {/* Left Section: Dishes */}
        <Grid item xs={12} md={8}>
          <SearchBar />
          <DishesGrid dishes={dishes} />

          
        </Grid>

        {/* Right Section: Cart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={24} sx={{ p: 18 }}>
            <Typography variant="h5" sx={{ mb: 9 }}>
              Cart
            </Typography>
            <cart/>
          </Paper>
        </Grid>
      </Grid>
    
    </Container>
     
      
    
    </>
  )
}
export default POS;