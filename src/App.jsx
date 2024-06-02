import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import Upload from './Pages/Upload';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { auth } from './config/firebase';
import UserRecipes from './Pages/UserRecipes';
import UpdateRecipes from './Pages/UpdateRecipes'; // Import the UpdateRecipes component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login updateUser={setUser} />} />
          <Route path="/upload" element={<Upload user={user} />} />
          <Route path="/user-recipes" element={<UserRecipes user={user} />} />
          <Route path="/update-recipes" element={<UpdateRecipes user={user} />} /> // Add this new route
        </Routes>
      </div>
    </>
  );
}

export default App;
