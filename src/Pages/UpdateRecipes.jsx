import React, { useEffect, useState, useRef } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function UpdateRecipe({ user }) {
    const [userRecipesList, setUserRecipesList] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeText, setRecipeText] = useState('');
    const recipesCollectionRef = collection(db, 'recipes');
    const dialogRef = useRef(null);
    const backdropRef = useRef(null);

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

    const startEditing = (recipe) => {
        setEditingRecipe(recipe);
        setTitle(recipe.title);
        setImageUrl(recipe.imageUrl);
        setIngredients(recipe.ingredients.join(', '));
        setRecipeText(recipe.recipeText);
        dialogRef.current.showModal();
        backdropRef.current.style.display = 'block';
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedRecipe = {
            title,
            imageUrl,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            recipeText,
            author: user.email,
            creationDate: editingRecipe.creationDate // Keep the original creation date
        };

        try {
            const recipeDoc = doc(db, 'recipes', editingRecipe.id);
            await updateDoc(recipeDoc, updatedRecipe);
            setUserRecipesList(userRecipesList.map(r => r.id === editingRecipe.id ? updatedRecipe : r));
            setEditingRecipe(null);
            dialogRef.current.close();
            backdropRef.current.style.display = 'none';
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    };

    const handleDelete = async (id) => {
        try {
            const recipeDoc = doc(db, 'recipes', id);
            await deleteDoc(recipeDoc);
            setUserRecipesList(userRecipesList.filter(r => r.id !== id));
        } catch (e) {
            console.error('Error deleting document: ', e);
        }
    };

    const handleClose = () => {
        setEditingRecipe(null);
        dialogRef.current.close();
        backdropRef.current.style.display = 'none';
    };

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
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                                        onClick={() => startEditing(recipe)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleDelete(recipe.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>

            <div ref={backdropRef} className="fixed inset-0 bg-black opacity-50 z-40" style={{ display: 'none' }}></div>

            <dialog ref={dialogRef} className="rounded shadow-lg p-6 bg-white w-full max-w-2xl z-50">
                <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
                            Ingredients (comma separated)
                        </label>
                        <textarea
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            rows="6" // Add this line
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipeText">
                            Recipe Instructions
                        </label>
                        <textarea
                            id="recipeText"
                            value={recipeText}
                            onChange={(e) => setRecipeText(e.target.value)}
                            rows="10" // Add this line
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Recipe
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </section>
    );
}
