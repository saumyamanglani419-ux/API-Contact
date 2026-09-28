import bcrypt from "bcryptjs";
import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // console.log("printing the data :", req.body);

  if (name == "" || email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }

  let user = await User.findOne({ email });

  if (user) return res.json({ message: "User already exists", success: false });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPassword });

  res.json({
    message: "User created successfully",
    success: true,
    user,
  });
};

// login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }

  const user = await User.findOne({email})

  if(!user) return res.json({message:"User not exists", success:false})

    const validPass = await bcrypt.compare(password, user.password)

    if (!validPass) {
      return res.json({message:"Invalid Password", success:false})
    }

    const token = jwt.sign({userId:user._id},process.env.JWT, {
      expiresIn :'1d'
    })

    res.json({message:`Welcome ${user.name}`,token, success:true})
};
