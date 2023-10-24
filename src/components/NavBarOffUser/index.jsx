import { Link } from 'react-router-dom';

export default function NavBarOffUser() {
  const link = `ml-4 font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500`;

  return (
    <div className="flex items-center  ">
      <div className="relative">
        <Link className={link} to={'/login'}>
          Login
        </Link>
        {/* <Link className={link} to={'/login'}>
          Register
        </Link> */}
      </div>
    </div>
  );
}
