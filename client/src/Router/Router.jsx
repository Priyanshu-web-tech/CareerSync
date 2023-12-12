import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import PrivateRoute from "../components/PrivateRoute";

import JobDetails from "../Pages/JobDetails";
import Profile from "../Pages/Profile";

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
        path: "/salary",
        element: <SalaryPage />,
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
            loader: ({ params }) => fetch(`/api/job/all-jobs/${params.id}`),
          },
          {
            path: "/my-job",
            element: <MyJobs />,
          },
        ],
      },
    ],
  },
]);

export default router;
