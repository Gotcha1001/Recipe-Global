import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="bg-black text-white p-4 rounded-md">
            <div className="container mx-auto flex justify-between items-center py-2">
                <Link to="/" className="text-2xl font-bold hover:text-red-700 rounded-lg  p-2 ">
                    Your Recipes
                </Link>
                {/* Navbar toggle button for small and medium screens */}
                <div className="md:hidden">
                    <button className="text-white ">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                {/* Navbar items for large screens */}
                <ul className="hidden md:flex gap-4 items-center list-none">
                    {user && (
                        <>
                            <h2 className="text-sm font-bold">Welcome, {user.email}</h2>
                            <CustomLink className="nav-link hover:text-red-700" to="/upload">Upload</CustomLink>
                            <CustomLink className="nav-link hover:text-red-700" to="/user-recipes">My Recipes</CustomLink>
                            <CustomLink className="nav-link hover:text-red-700" to="/update-recipes">Update Recipes</CustomLink>
                        </>
                    )}
                    {user ? (
                        <button
                            className="nav-link hover:text-red-700"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <CustomLink className="nav-link hover:text-red-700 p-2 text-xl" to="/login">Login</CustomLink>
                    )}
                </ul>
            </div>
            {/* Dropdown menu for small and medium screens */}
            <div className="md:hidden bg-gradient-to-r from-red-700 to-black text-white py-2 rounded-md">
                <ul className="flex flex-col gap-4 items-center list-none">
                    {user && (
                        <>
                            <CustomLink className="nav-link" to="/upload">Upload</CustomLink>
                            <CustomLink className="nav-link" to="/user-recipes">My Recipes</CustomLink>
                            <CustomLink className="nav-link" to="/update-recipes">Update Recipes</CustomLink>
                            <button
                                className="nav-link"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!user && (
                        <CustomLink className="nav-link" to="/login">Login</CustomLink>
                    )}
                </ul>
            </div>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    return (
        <li>
            <Link
                to={to}
                id="links"
                className="block px-4 py-2 font-bold rounded-lg text-white hover:text-gray-700 hover:bg-gray-200"
                {...props}
            >
                {children}
            </Link>
        </li>
    );
}

