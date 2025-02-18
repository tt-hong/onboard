import { Link, Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto px-6 py-3">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/exp" className="hover:text-gray-300">
                Experience
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gray-300">
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          © 2025 Harry Phan. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
