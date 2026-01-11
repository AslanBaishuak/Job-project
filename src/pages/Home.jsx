import { Link } from "react-router-dom";

const Home  = () =>  {
  return (
    <div>
      <h1>Job Portal</h1>
      <p>Find a job or post a job easily</p>

      <Link to="/jobs">Find Jobs</Link> |{" "}
      <Link to="/post-job">Post Job</Link> |{" "}
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;