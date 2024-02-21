import './App.css';
import Home from './pages/Home';
import React, { useEffect, useRef, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorMessage from './pages/ErrorMessage';
import Details from './pages/Details';
import BookmarksContext from './BookmarksContext';
import Bookmarks from './pages/Bookmarks';
import MyShop from './pages/MyShop';

function App() {
  const [bookmarks, setBookmarks]=useState([]);
  const [dataLoaded, setDataLoaded]=useState(false);
  const [install,setInstall]=useState(false);
  useEffect(()=>{
    if(dataLoaded){
      console.log("Sauvegarde:",bookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  },[bookmarks])

  useEffect(()=>{
    const savedBookmarks=JSON.parse(localStorage.getItem("bookmarks")||"[]");
    setBookmarks(savedBookmarks);
    console.log("Chargement:",savedBookmarks);
    setDataLoaded(true);
  },[])

  



  //création du routeur
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>,
      errorElement:<ErrorMessage/>,
    },
    {
      path:"/details/:slug",
      element:<Details/>,
    },
    {
      path:"/bookmarks",
      element:<Bookmarks/>,
    },
    {
      path:"/shop",
      element:<MyShop/>,

    },
  ],{basename:"/moteurderecherchedejeuxvideo"});
  const deferredPrompt=useRef(null);
  useEffect(()=>{
    const handler=(e)=>{
      e.preventDefault();
      setInstall(e.prompt);
    };
    window.addEventListener('beforeinstallprompt',handler);
    return()=>{
      window.removeEventListener('beforeinstallprompt',handler);
    };
  },[]);
  const handleInstall=()=>{
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then((choiceResult)=>{
      if(choiceResult.outcome==='accepted'){
        alert("Merci d'avoir installé l'application !")
      }else{
        console.log("L'utilisateur a refusé l'installation");
      }
      deferredPrompt.current=null;
    });
    setInstall(false);
  }
  return (
    <BookmarksContext.Provider value={{bookmarks,setBookmarks}}>
      {install&&(
        <div className='bg-gray-300 shadow-gray-700 p-4 flex items-center'>
          <div className='flex-grow text-center'>Voulez-vous installer l'application sur votre appareil ?</div>
          <button className='px-4 py-2 rounded text-white bg-teal-600' onClick={handleInstall}>Installer</button>
        </div>
      )}
    <RouterProvider router={router}/>
    </BookmarksContext.Provider>
  );  
}
export default App;
