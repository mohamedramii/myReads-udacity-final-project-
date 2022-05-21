import React from "react";
import {Link} from "react-router-dom";
 
import SearchingShelf from "./Searchingshelf";

const Sbook = ({ query, setquery, MBooks, changeShelf, sbooks,available}) => {
  
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">close</Link>
          <div className="search-books-input-wrapper">
            { <input type="text" placeholder="Search by title, author, or ISBN"  value={query} onChange={(e)=>{setquery(e.target.value);}}/>}
            
          
                            

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            
            {
             <SearchingShelf MBooks={MBooks} changeShelf={changeShelf} sbooks={sbooks} available={available}> </SearchingShelf>
               }
            


          </ol>
        </div>
      </div>
    </div>
  );
};
export default Sbook;