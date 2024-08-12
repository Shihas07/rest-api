//  const express=require("express")

const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Produect = require("../model/proudect");
const produect = require("../model/proudect");
const { findById } = require("../model/user");

const home = async (req, res) => {
  res.status(200).json({ message: "home page" });
};
const getsignup = async (req, res) => {
  res.status(200).json({ message: "success" });
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword });

    await admin.save();

    return res
      .status(201)
      .json({ message: "User successfully created", data: { name, email } });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(400).json({ message: "canot find admin" });
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("admin_jwt", token, { httpOnly: true, maxAge: 86400000 });
  console.log(token);
  return res.status(200).json({ message: "succes login" });
};

const addProduect = async (req, res) => {
  const { name, size, price } = req.body;

  if (!name || !size || !price) {
    return res.status(400).json({ message: "missing credetial" });
  }

  const existingProduect = await Produect.findOne({ name });
  if (existingProduect) {
    return res.status(400).json({ message: "alredy has this name" });
  }

  const newProduect = new Produect({
    name,
    size,
    price,
  });

  newProduect.save();

  res.status(200).json({ message: "succes add produect" });
};

const getListProduect = async (req, res) => {
  try {
    const listData = await Produect.find();

    res
      .status(200)
      .json({ message: "List retrieved successfully", data: listData });
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduect = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const excistData = await Produect.findById(id);
    console.log(excistData);

    if (!excistData) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Produect.deleteOne({ _id: id });

    res.status(200).json({ message: "success deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.query;
    console.log("Product ID:", id);

    const data = await Produect.findById(id);
    console.log("Product Data:", data);

    if (!data) {
      return res.status(404).json({ message: "Invalid ID, product not found" });
    }

    const updatedProduct = await Produect.findByIdAndUpdate(id, {
      name: req.body.name,
      size: req.body.size,
      price: req.body.price,
    });

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  home,
  getsignup,
  signup,
  postLogin,
  addProduect,
  getListProduect,
  deleteProduect,
  update,
};
