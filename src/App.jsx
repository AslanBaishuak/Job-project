import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Favorites from "./pages/Favorites";
import CompanyJobs from "./pages/CompanyJobs";
import Navbar from "./components/NavBar";


export default function App() {

  const  authorized= Boolean(localStorage.getItem("token"));
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!authorized && <Route path="/login" element={<Login />} />}
        {!authorized && <Route path="/register" element={<Register />} />}
        {authorized && <Route path="/post-job" element={<PostJob />} />}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<h1>404</h1>}/>
        <Route path="/company-jobs" element={<CompanyJobs />} />
      </Routes>
    </BrowserRouter>
  );
}
