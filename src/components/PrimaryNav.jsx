import { Link } from "react-router-dom";

const PrimaryNav = () => (
  <ul className="flex justify-center">
    <li className="m-1 px-2 py-0.5 text-rose-700 hover:text-rose-900 hover:bg-rose-100 rounded-lg">
      <Link to="/">Articles</Link></li>
    <li className="m-1 px-2 py-0.5 text-rose-700 hover:text-rose-900 hover:bg-rose-100 rounded-lg"><Link to="/topics">Topics</Link></li>
  </ul>
);

export default PrimaryNav;
