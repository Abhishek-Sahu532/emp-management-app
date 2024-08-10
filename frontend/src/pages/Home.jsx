import { useEffect } from "react";
import { Table } from "../components/Table";
import Testimonial from "../components/Testimonial";
import {
  getAllUsersStart,
  getAllUsersFailure,
  getAllUsersSuccess,
} from "../redux/users/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getEmpsDetails = async () => {
      try {
        dispatch(getAllUsersStart());
        const res = await axios.get("/api/v1/users/emp-details");
        console.log("res", res.data);
        dispatch(getAllUsersSuccess(res.data));
      } catch (error) {
        let htmlError = extractErrorMessage(error.response?.data);
        // console.log(htmlError);
        dispatch(getAllUsersFailure(htmlError || error.message));
      }
    };

    getEmpsDetails();
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-screen-2xl py-2 overflow-hidden">
      <Testimonial />
      <Table />
    </div>
  );
}
