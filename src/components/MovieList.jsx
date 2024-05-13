import "./MovieList.css"
import React from 'react'
// import AddFavorites from "./AddFavorites"
const MovieList = (props) => {
//  const FavouriteComponent = props.favouriteComponent;
 return (
    <>
      {props.movies.map((movie,index) => (
         <div key={index} className="image-container d-flex justify-content-start " style={{width :"350px"}}>
            <img src={movie.Poster} alt="movie" className="bor" />
            <div
             className = "overlay d-flex align-items-center justify-content-center"
             onClick={()=>props.handleFavoriteClick(movie)}
            >
          {props.favoriteComponent}
            </div>
         </div>     

      ))}
    </>
)
}

export default MovieList