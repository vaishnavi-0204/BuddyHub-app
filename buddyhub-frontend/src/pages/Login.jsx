import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Login
          </button>

          <p className="text-center mt-3"> dont have acoount</p>
          <Link
            to="/register"
            className="btn btn-dark border w-100 text-decoration-none"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
