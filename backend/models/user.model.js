import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import _AutoIncrement from "mongoose-sequence";

const autoIncrement = _AutoIncrement(mongoose);

const userSchema = new Schema(
  {
    employeeID: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure email uniqueness
    },
    empType: {
      type: String,
      enum: {
        values: ["Employee", "Manager"],
        message: "{VALUE} is not a valid priority",
      },
      default: "Employee",
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      trim: true,
      index: true,
    },
    companyName: {
      type: String,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Resign"],
        message: "{VALUE} is not a valid priority",
      },
      default: "Active",
    },
    salary: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    departmentName: [
      {
        type: String,
        enum: {
          values: ["HR", "IT", "Sales", "Product", "Marketing"],
          message: "{VALUE} is not a valid priority",
        },
      },
    ],
    hobbies: [
      {
        type: String,
      },
    ],
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.plugin(autoIncrement, {
  id: "employeeID_seq",
  inc_field: "employeeID",
});

// Mongoose middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Mongoose - adding methods for password match
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.refreshAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// RESET TOKEN
userSchema.methods.getResetPasswordToken = function () {
  // Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing Token & saving the value
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // min/sec/milliseconds

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
