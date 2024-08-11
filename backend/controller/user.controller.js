import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    //to not touch the validation specially the password , just update the refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

//registering the user
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, password, email, hobbies } = req.body;

  if (
    [firstName, lastName, password, email, hobbies].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    fullname: `${firstName} ${lastName} `,
    email,
    password,
    hobbies,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

//login functionality
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email) {
    throw new ApiError(400, "username or password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //sending details in cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  //by default an user or client can change the cookies in the browser but when we modify the httpOnly and secure with the true value so only from server we can change the cookies.
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

//logout functionality
export const logoutUser = asyncHandler(async (req, res) => {
  //clear the cookies from the client and database
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true, //to getting the updated value
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

//fetching the current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log(req.user)
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfulyy"));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { location, companyName, status, salary, departmentName } = req.body;
  const employeeID = req.params.employeeID;

  if (!location || !companyName || !status || !salary || !departmentName) {
    throw new ApiError(400, "All fields are required");
  }

  const emp = await User.findOne({ employeeID: employeeID });

  if (!emp) {
    throw new ApiError(400, "Emp not found");
  }

  const user = await User.findByIdAndUpdate(
    emp._id,
    {
      $set: { location, companyName, status, salary, departmentName },
    },
    { new: true }
  ).select("-password -email -hobbies -resetPasswordToken -refreshToken");
  console.log(user);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const { department, location, empname, employeeID, sort } = req.query;

  let queryObject = {};

  if (department) {
    queryObject.departmentName = department;
  }
  if (location) {
    queryObject.location = location;
  }
  if (empname) {
    queryObject.fullname = empname;
  }
  if (employeeID) {
    queryObject.employeeID = employeeID;
  }

  let users = await User.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(",", " ");
    users = users.sort(sortFix);
  }
  // console.log(users)
  const usersForServer = users.map((user) => {
    const userObject = user.toObject(); // Convert mongoose document to plain JS object
    delete userObject.password;
    delete userObject.refreshToken;
    return userObject;
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, usersForServer, "Emps details fetched successfulyy")
    );
});

export const deleteEmpDetails = asyncHandler(async (req, res) => {
  const employeeID = req.params.employeeID;

  const emp = await User.findOne({ employeeID: employeeID });

  if (!emp) {
    throw new ApiError(400, "Emp not found");
  }
  // console.log(emp)

  await User.findByIdAndDelete({
    _id: emp._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account deleted successfully"));
});
