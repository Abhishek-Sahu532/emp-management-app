import { useSelector } from "react-redux";
import { Table } from "../components/Table";
import Testimonial from "../components/Testimonial";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="mx-auto max-w-screen-2xl py-2 overflow-hidden">
      <Testimonial />
      {currentUser?.empType == "Manager" ? <Table /> : ""}
    </div>
  );
}
