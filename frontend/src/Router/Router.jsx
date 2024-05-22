import { createBrowserRouter } from "react-router-dom";
import axios from "axios";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import UpdateJob from "../Pages/UpdateJob";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import PrivateRoute from "../components/PrivateRoute";
import JobDetails from "../Pages/JobDetails";
import Profile from "../Pages/Profile";
import About from "../Pages/About";
import AppliedJobs from "../Pages/AppliedJobs";
import Responses from "../Pages/Responses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/post-job",
            element: <CreateJob />,
          },
          {
            path: "/edit-job/:id",
            element: <UpdateJob />,
            loader: async ({ params }) => {
              const response = await axios.get(`/api/job/all-jobs/${params.id}`);
              return response.data;
            },
          },
          {
            path: "/my-job",
            element: <MyJobs />,
          },
          {
            path: "/jobs-applied",
            element: <AppliedJobs />,
          },
          {
            path: "/responses",
            element: <Responses />,
          },
        ],
      },
    ],
  },
]);

export default router;
