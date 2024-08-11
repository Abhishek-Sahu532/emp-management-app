/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/users/empsSlice";
import { extractErrorMessage } from "../extractErrorMessage";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const departments = ["HR", "IT", "Sales", "Product", "Marketing"];

export default function UpdateEmpDetailsBox({ user }) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: user.location,
      companyName: user.companyName,
      salary: user.salary,
      departmentName: user.departmentName ? user.departmentName.split(",") : [],
      status: user.status,
    },
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    setValue("location", user.location);
    setValue("companyName", user.companyName);
    setValue("salary", user.salary);
    setValue(
      "departmentName",
      user.departmentName ? user.departmentName.split(",") : []
    );
    setValue("status", user.status);
  }, [user, setValue]);

  const handleOpen = () => setOpen(!open);

  const onSubmit = async (data) => {
    data.departmentName = data.departmentName.join(",");
    try {
      dispatch(updateUserStart());
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put(
        `/api/v1/users/update-emp-details/${user.employeeID}`,
        data,
        config
      );
      dispatch(updateUserSuccess(res.data));
      toast.success("Details updated successfully");
    } catch (error) {
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(updateUserFailure(htmlError || error.message));
      toast.error(htmlError || error.message);
    }
    handleOpen();
  };

  return (
    <>
      <IconButton variant="text" onClick={handleOpen}>
        <PencilIcon className="h-4 w-4" />
      </IconButton>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit User Details</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium">
                  Employee ID:
                </label>
                <p>{user.employeeID}</p>
              </div>
              <div>
                <label className="block text-sm font-medium">Full Name:</label>
                <p>{user.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Joining Date:
                </label>
                <p>{user.joiningDate}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Location:</label>
              <Input
                {...register("location", { required: "Location is required" })}
                error={errors.location?.message}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Company Name:</label>
              <Input
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                error={errors.companyName?.message}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Salary:</label>
              <Input
                type="number"
                {...register("salary", { required: "Salary is required" })}
                error={errors.salary?.message}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Department Name:
              </label>
              <Controller
                name="departmentName"
                control={control}
                rules={{ required: "At least one department is required" }}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-wrap gap-4">
                    {departments.map((dept) => (
                      <Checkbox
                        key={dept}
                        label={dept}
                        checked={value.includes(dept)}
                        onChange={(e) => {
                          const updatedValue = e.target.checked
                            ? [...value, dept]
                            : value.filter((v) => v !== dept);
                          onChange(updatedValue);
                        }}
                      />
                    ))}
                  </div>
                )}
              />
              {errors.departmentName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.departmentName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Status:</label>
              <Input
                {...register("status", { required: "Status is required" })}
                error={errors.status?.message}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            variant="gradient"
            color="green"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
