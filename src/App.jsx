import { useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import MovieList from "./components/MovieList"
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox"
import AddFavorites from "./components/AddFavorites"
import RemoveFavourite from './components/RemoveFavourite'

function App() {

  const [movies,setMovies]= useState([]);
  const [searchValue,setSearchValue]= useState('');
  const [favorites,setFavorites]=useState([]);

  const getMovieRequest= async(searchValue) => {
    const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=cf073260`;
    const response=await fetch(url);
    const responseJson=await response.json();
    if(responseJson.Search)
    {
    setMovies(responseJson.Search);
    }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
   },[searchValue]);

   useEffect(() => {
    const storedFavorites = localStorage.getItem('react-movie-app-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);




  const AddFavoriteMovie= (movie)=>{
    const newFavouriteList=[...favorites,movie];
    setFavorites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  const RemoveFavouriteMovie=(movie)=>{
    const newFavouriteList=favorites.filter((favor) => favor.imdbID !== movie.imdbID);
    setFavorites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const saveToLocalStorage=(items)=>{
    localStorage.setItem("react-movie-app-favorites",JSON.stringify(items))
 
  };
  
  return (
   <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        < MovieListHeading heading="Movies" />
        <SearchBox SearchValue ={searchValue} SetSearchValue={setSearchValue} />
      </div>
      <div className="row">
          <MovieList
            movies={movies}
            handleFavoriteClick={AddFavoriteMovie}
            favoriteComponent={<AddFavorites />}
          />
      </div>
      <div className="row d-flex align-items mt-4 mb-4">
        <MovieListHeading heading ="Favorites"/>
      </div>
      <div className="row">
        <MovieList
        movies={favorites} 
        handleFavoriteClick={RemoveFavouriteMovie}
        favoriteComponent={<RemoveFavourite/>}
        />
      </div>
   </div>
  )
}

export default App
