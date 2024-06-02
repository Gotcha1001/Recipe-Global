import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Upload({ user }) {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeText, setRecipeText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {
            title,
            imageUrl,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            recipeText,
            author: user.email,
            creationDate: new Date().toISOString()
        };

        try {
            const docRef = await addDoc(collection(db, 'recipes'), newRecipe);
            console.log('Document written with ID: ', docRef.id);
            // Redirect to UserRecipes.jsx after successful submission
            navigate('/');
        } catch (e) {
            console.error('Error adding document: ', e);
        }

        // Clear the form
        setTitle('');
        setImageUrl('');
        setIngredients('');
        setRecipeText('');
    };

    return (
        <div className="container mx-auto py-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        rows="6" // Add this line to increase the textarea size
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
                        rows="10" // Add this line to increase the textarea size
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Recipe
                    </button>
                </div>
            </form>
        </div>
    );
}
