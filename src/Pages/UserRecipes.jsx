import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

export default function UserRecipes({ user }) {
    const [userRecipesList, setUserRecipesList] = useState([]);
    const recipesCollectionRef = collection(db, 'recipes');

    useEffect(() => {
        if (user) {
            const q = query(recipesCollectionRef, where('author', '==', user.email));
            async function getUserRecipes() {
                try {
                    const data = await getDocs(q);
                    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setUserRecipesList(filteredData);
                } catch (err) {
                    console.error(err);
                }
            }
            getUserRecipes();
        }
    }, [user]);

    return (
        <section id="user-recipes" className="container mx-auto py-8">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center">
                {userRecipesList.length > 0 ? (
                    userRecipesList.map((recipe) => (
                        <div key={recipe.id} className="col mb-4 w-full">
                            <div className="card bg-red-800 text-white shadow border-0">
                                <div className="p-4 mt-4 overflow-hidden rounded-lg flex justify-center items-center">
                                    <img
                                        src={recipe.imageUrl}
                                        alt={recipe.title}
                                        className="card-img-top zoom"
                                        style={{ borderRadius: '0.5rem', maxWidth: '70%', width: '60%', maxHeight: '70%', height: '60%' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="bg-red-900 hover:bg-black p-2 mb-2 text-bold rounded-lg">
                                        <h5 className="card-title text-white">Title: {recipe.title}</h5>
                                    </div>
                                    <div className="bg-red-900 p-2 mb-2 hover:bg-stone-950 rounded-lg">
                                        <p className="card-text">Author: {recipe.author}</p>
                                    </div>
                                    <div className="bg-red-900 p-2 mb-2 hover:bg-stone-950 rounded-lg">
                                        <p className="card-text">Date: created {recipe.creationDate}</p>
                                    </div>
                                    <div className="bg-red-900 p-2 mb-2 hover:bg-stone-900 rounded-lg flash-bg">
                                        <h6 className="card-subtitle mb-2">Ingredients:</h6>
                                        <ul className="list-disc pl-4">
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-900 p-2 mb-2 hover:bg-stone-950 rounded-lg">
                                        <h6 className="card-subtitle mb-2">How to make it:</h6>
                                        <p className="card-text whitespace-pre-wrap">{recipe.recipeText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>
        </section>
    );
}
