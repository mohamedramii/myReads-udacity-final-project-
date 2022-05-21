

import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useState, useEffect } from "react";
import {
  BrowserRouter as 
  Router,
  Routes,
  Route } from "react-router-dom";


import Home from "./Components/Home";
import Sbook from "./Components/Sbook";

function App() {
  const [books, setbooks] = useState([]);
  const [sbooks, setsbooks] = useState([]);
  const[MBooks,setMBooks]=useState([]);
  const [query, setquery] = useState("");
  const [mapOfIdToBooks,setMapOfIdToBooks]=useState(new Map());
  const [available,setAvailable]=useState(false);
  const createMapOfBooks =(books)=>{
    const map= new Map();
    books.map(book=>map.set(book.id,book))
    return map;
      }
    useEffect(()=>{
    
    
    const combined =sbooks.map(book=>{
      if(mapOfIdToBooks.has(book.id)){
        return mapOfIdToBooks.get(book.id);
      }else{
        return book;
      }
    })
    setMBooks(combined);
    
    
    },[ 
      sbooks])

  useEffect(() => {
    const getBooks = async () => {
      const result = await BooksAPI.getAll();
      console.log(result);
      setbooks(result);
      setMapOfIdToBooks(createMapOfBooks(result))
    };
    getBooks();
  }, []);

  useEffect(() => {
    let isActive = true;

    if (query) {
      BooksAPI.search(query).then((data) => {
        
        
        
        if (data.error) {
          setsbooks([]);
        } else {
          if (isActive) {
            setsbooks(data);
            setAvailable(true);
          }
        }
      });
    }
    return () => {
      isActive = false;
      setsbooks([]);
      console.log("UNMOUNT data from ", query);
    };
  }, [query]);

  const changeShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    BooksAPI.update(book, shelf);
    const result = await BooksAPI.getAll();

    setbooks(result);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Home changeShelf={changeShelf} books={books}></Home>}
          ></Route>
          <Route
            path="/search"
            element={
              <Sbook
              query={query} setquery={setquery} MBooks={MBooks} changeShelf={changeShelf} sbooks={sbooks}available={available}
              ></Sbook>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
