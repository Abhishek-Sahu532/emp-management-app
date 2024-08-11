import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function Testimonial() {
  const { laoding, currentUser } = useSelector((state) => state.user);
//   console.log(currentUser);
  const joinedAt = new Date(currentUser?.createdAt).toLocaleDateString();
  return (
    <>
      {laoding && laoding ? (
        <Loader />
      ) : (
        <Card
          color="transparent"
          shadow={false}
          className="rounded-none px-4 py-2  lg:px-8 lg:py-4 bg-brown-50"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {currentUser?.fullname}
                </Typography>
              </div>
              <Typography color="blue-gray">
                {" "}
                {currentUser?.departmentName &&
                currentUser?.companyName
                  ? `In ${currentUser?.departmentName[0]} Dept  @ ${currentUser?.companyName}`
                  : ""}{" "}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>
              &quot;I found solution to all my design needs from Creative Tim. I
              use them as a freelancer in my hobby projects for fun! And its
              really affordable, very humble guys !!!&quot;
            </Typography>

            <div className="flex w-full flex-col gap-2 mt-3">
              <div className="flex items-center gap-3">
                <Typography variant="h6" color="blue-gray">
                  Email -
                </Typography>
                <Typography color="blue-gray">
                  {" "}
                  {currentUser?.email
                    ? currentUser?.email
                    : ""}{" "}
                </Typography>{" "}
              </div>

              <div className="flex items-center gap-3">
                <Typography  variant="h6" color="blue-gray">
                  Emp Type -
                </Typography>
                <Typography color="blue-gray">
                  {" "}
                  {currentUser?.empType
                    ? currentUser?.empType
                    : ""}{" "}
                </Typography>{" "}
              </div>
              <div className="flex items-center gap-3">
                <Typography  variant="h6" color="blue-gray">
                  Hobbies -
                </Typography>
                <Typography color="blue-gray">
                  {" "}
                  {currentUser?.hobbies
                    ? currentUser?.hobbies.join(", ")
                    : ""}{" "}
                </Typography>{" "}
              </div>
              <div className="flex items-center gap-3">
                <Typography  variant="h6" color="blue-gray">
                  Joined At -
                </Typography>
                <Typography color="blue-gray">
                  {" "}
                  {currentUser?.createdAt ? `${joinedAt}` : ""}
                </Typography>{" "}
              </div>
            </div>
          </CardBody>
        </Card>
      )}{" "}
    </>
  );
}

export default Testimonial;
