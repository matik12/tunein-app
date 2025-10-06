import { Link } from "@tanstack/react-router";

const NotFoundLayout = () => {
  return (
    <div className="text-center text-white space-y-4 pt-20">
      <h1 className="text-4xl font-extrabold">Not Found - 404</h1>
      <p className="text-lg">
        The page you are looking for does not exist. Start over with{" "}
        <Link
          className="font-medium text-blue-600 underline hover:no-underline"
          to="/"
        >
          home page
        </Link>
      </p>
    </div>
  );
};

export default NotFoundLayout;
