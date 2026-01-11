import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Favorites from "./pages/Favorites";
import CompanyJobs from "./pages/CompanyJobs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/company-jobs" element={<CompanyJobs />} />
      </Routes>
    </BrowserRouter>
  );
}
