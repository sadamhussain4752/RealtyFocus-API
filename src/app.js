// app.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require('dotenv').config();



const cors = require("cors"); // Import cors middleware
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const authRoutes = require("./routes/authRoutes");
const UserController = require("./routes/UserRoutes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes/categoryRoutes");
const brandRoutes = require("./routes/BrandRoutes/brandRoutes");
const productRoutes = require("./routes/ProductRoutes/productRoutes");
const couponRoutes = require("./routes/couponRoutes/CouponRouter");
const addressRoutes = require("./routes/AddressRoutes/addressRoutes");
const addcartRoutes = require("./routes/AddCartRoutes/addCartRoutes");
const orderRoutes = require("./routes/OrderRoutes/orderRoutes");
const BannerRoutes = require("./routes/BannerRouters/BannerRoutes");
const EmployeeRoutes = require("./routes/AddEmployess/addEmployeesRoutes");
const FAQRoutes = require("./routes/AddFaqRoutes/faqRoutes");
const ProjectRoutes = require("./routes/AddProjectRoutes/ProjectRoutes");
const TaskRoutes = require("./routes/AddTaskRoutes/TaskRoutes");
const UserRoleRoutes = require("./routes/UserRoleRoutes/UserRoleRoutes");
const amenitiesRoutes = require('./routes/AmenitiesRoutes/amenities');
const specificationsRoutes = require('./routes/SpecificationsRoutes/specifications');
const SpecificationsDetailRoutes = require('./routes/SpecificationsDetailRoutes/specificationsdetail');
const BankapprovalRoutes = require('./routes/BankapprovalRoutes/bankapprovalRoutes');
const LegalapprovalRoutes = require('./routes/LegalapprovalRoutes/LegalapprovalRoutes');
const BlogsRoutes = require('./routes/AddBlogsRoutes/BlogsRoutes');
const BuilderRoutes = require('./routes/AddBuilderRoutes/builderRoutes');
const FloorPlanRoutes = require('./routes/AddFloorRoutes/floorPlanRoutes');
const ImageDataRoutes = require('./routes/AddImageDataRoutes/imageDataRoutes');
const MetaRoutes = require('./routes/AddMetaRoutes/MetaRoutes');
const MicositeRoutes = require('./routes/AddMicoSiteRoutes/MicositeRoutes');
const MicositedetailRoutes = require('./routes/AddmicrositedetailRoutes/MicositedetailRoutes');
const MicrositeRatingRoutes = require('./routes/AddMicrositeRatingRoutes/MicrositeRatingRoutes');
const PriceRoutes = require('./routes/AddPriceRoutes/PriceRoutes');
const PropstatusRoutes = require('./routes/AddPropstatusRoutes/PropstatusRoutes');
const PropTypeRoutes = require('./routes/AddPropTypeRoutes/PropTypeRoutes');
const MicrositeMetaTagRoutes = require('./routes/AddMicrositeMetaTagRoutes/MicrositeMetaTagRoutes');
const accessRoutes = require("./routes/accessControl");
const profileRoutes = require("./routes/ProfileRoutes/profileRoutes");
const adminRoutes = require("./routes/AddadminRoutes/adminRoutes");





const app = express();
// Use cors middleware
app.use(cors());



// Use express.static to serve static files (including images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 4000;

// // MySQL connection setup
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT, // Ensure this is 3307
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("MySQL connected successfully");
// });





// Additional setup, if any

app.use(bodyParser.json());

// Use routes

app.use("/api/auth", authRoutes);
app.use("/api/user", UserController);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/addcart", addcartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/header", BannerRoutes);
app.use("/api/staff", EmployeeRoutes);
app.use("/api/faq", FAQRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/task", TaskRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/specifications', specificationsRoutes);
app.use('/api/specificationsdetail', SpecificationsDetailRoutes);
app.use('/api/bankapproval', BankapprovalRoutes);
app.use('/api/legalapproval', LegalapprovalRoutes);
app.use('/api/blogs', BlogsRoutes);
app.use('/api/builders', BuilderRoutes);
app.use('/api/floor-plans', FloorPlanRoutes);
app.use('/api/upload-image', ImageDataRoutes);
app.use('/api/meta', MetaRoutes);
app.use('/api/microsites', MicositeRoutes);
app.use('/api/microsite_detail', MicositedetailRoutes);
app.use('/api/microsite_rating', MicrositeRatingRoutes);
app.use('/api/microsite-meta-tag', MicrositeMetaTagRoutes);
app.use('/api/price', PriceRoutes);
app.use('/api/prop-status', PropstatusRoutes);
app.use('/api/prop-type', PropTypeRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", adminRoutes);







// app.use("/api/userrole", UserRoleRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});