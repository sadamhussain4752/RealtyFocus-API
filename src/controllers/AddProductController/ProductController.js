// controllers/Product.js
const Product = require("../../models/ProductModel/Product");
const {BASEURL} = require('../../utils/Constants')
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Create a new Product

const LANGID = {
  1: "IND",
  2: "JPN",
  3: "KOR",
  4: "AUS",
};

exports.createProduct = async (req, res) => {

  try {
      const {
        name,
        subname,
        description,
        amount,
        offeramount,
        color,
        weight,
        dimensions,
        sku,
        availability,
        isActive,
        createdBy,
        category,
        lang,
        qty,
        exta_add_item
      } = req.body;
      console.log(req.file,req.files);
      // Assuming "images" is a file field in the form
      const imagePaths = req.files ? req.files.map(file => `${file.filename}`) : null;

      const newProduct = await Product.create({
          name,
          description,
          amount,
          offeramount,
          subname,
          imageUrl: req.fileUrls[0],
          color,
          weight,
          dimensions,
          sku,
          availability,
          isActive,
          createdBy,
          category,
          brand_id: "",
          lang,
          qty,
          exta_add_item,
          
      });

      res.status(200).json({ success: true, product: newProduct });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
  }
}

exports.getAllProducts = async (req, res) => {
  const { lang } = req.query;

  // Validate 'lang' parameter
  if (!lang || !LANGID[lang]) {
    return res.status(400).json({ success: false, error: "Invalid 'lang' parameter" });
}
 
  try {


  
    

    // const productsss = await Product.updateMany(
    //   {}, // Empty filter to match all documents
    //   {
    //     $set: {
    //      "itemid": "10542628",
    //      "itemObject": {
    //   "itemid": "10542628",
    //   "itemallowvariation": "0",
    //   "itemrank": "1",
    //   "item_categoryid": "77771",
    //   "item_ordertype": "1,2,3",
    //   "item_packingcharges": "15",
    //   "itemallowaddon": "1",
    //   "itemaddonbasedon": "0",
    //   "item_favorite": "0",
    //   "ignore_taxes": "0",
    //   "ignore_discounts": "0",
    //   "in_stock": "2",
    //   "cuisine": [],
    //   "variation_groupname": "",
    //   "variation": [],
    //   "addon": [
    //     {
    //       "addon_group_id": "11619",
    //       "addon_item_selection_min": "0",
    //       "addon_item_selection_max": "1"
    //     },
    //     {
    //       "addon_group_id": "11621",
    //       "addon_item_selection_min": "0",
    //       "addon_item_selection_max": "1"
    //     },
    //     {
    //       "addon_group_id": "11620",
    //       "addon_item_selection_min": "0",
    //       "addon_item_selection_max": "4"
    //     }
    //   ],
    //   "is_recommend": "0",
    //   "itemname": "Classic Mysore Biryani + Kabab",
    //   "item_attributeid": "2",
    //   "itemdescription": "Ditch the decision fatigue - we've got your complete feast covered!   Choose your favourite Biriyaani, from our range of Cassic Mysore, Epic Bangalore, Hyderabadi or Chicken 65 Biryani and we will make it even more exciting by adding some Kababs to the box.",
    //   "minimumpreparationtime": "",
    //   "price": "299.00",
    //   "active": "1",
    //   "item_image_url": "",
    //   "item_tax": "2532,2533",
    //   "tax_inclusive": false,
    //   "gst_type": "services"
    // }
    //     },
    //   }
    // );
    const products = await Product.find({ lang: LANGID[lang] });
   
   

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};





// exports.getAllProducts = async (req, res) => {
//   const { lang } = req.query;

//   // Validate 'lang' parameter
//   if (!lang || !LANGID[lang]) {
//     return res.status(400).json({ success: false, error: "Invalid 'lang' parameter" });
//   }

//   try {
//     // Path to the new products JSON file
//     const newProductPath = "/Users/admin/Documents/GitHub/local-heros-API/CloneProduct.json";

//     // Read and parse the new product data
//     const newProductRawData = fs.readFileSync(newProductPath, 'utf-8'); // Specify 'utf-8' to get string data
//     const newProducts = JSON.parse(newProductRawData);

//     // Validate the parsed data
//     if (!Array.isArray(newProducts) || newProducts.length === 0) {
//       return res.status(400).json({ success: false, error: "Invalid or empty product data" });
//     }

//     // Insert all products into the database
//     const clonedProducts = newProducts.map(product => {
//       const { _id, __v, ...rest } = product; // Remove unnecessary fields
//       return new Product({ ...rest }); // Create a new product object
//     });

//     // Save all products in one operation
//     const savedProducts = await Product.insertMany(clonedProducts);

//     return res.status(200).json({ success: true, savedProducts });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, error: "Server error" });
//   }
// };



// Get user-specific Products by language and search criteria
exports.getUserProducts = async (req, res) => {
  try {
    const { search } = req.query;

    // Create search query
    const query = {
      isActive: true, // Include only active products
      $or: [
        { name: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search for name
        { description: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search for description
      ],
    };

    // Fetch user products based on search criteria
    const userProducts = await Product.find(query);

    // // Path to the new products JSON file
    // const newProductPath = "/Users/admin/Documents/GitHub/local-heros-API/NewProduct.json";

    // // Read and parse the new product data
    // const newProductRawData = fs.readFileSync(newProductPath);
    // const newProducts = JSON.parse(newProductRawData); // Parse new products JSON data

    // // Loop over userProducts and update their itemObject field
    // for (let index = 0; index < userProducts.length; index++) {
    //   const product = userProducts[index];

    //   // Find matching newProduct based on itemid
    //   const matchingProduct = newProducts.find((newProduct) => newProduct.itemid === product.itemid);

    //   if (matchingProduct) {
    //     product.itemObject = matchingProduct; // Assign the matching product to itemObject
    //     await product.save(); // Save the updated product
    //   }
    // }

    // Send the response with the updated products
    res.status(200).json({ success: true, userProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// Get a specific Product by ID
exports.getProductById = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const Products = await Product.findById(ProductId);

    if (!Products) {
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });
    }

    res.status(200).json({ success: true, Products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update a specific Product by ID
exports.updateProductById = async (req, res) => {
  try {
      const ProductId = req.params.id;

        const token = req.headers.authorization?.split(" ")[1]; // Extract token
            if (!token) {
              return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
            }
        
            // Verify the token
            let decoded;
            try {
              decoded = jwt.verify(token, "ems47524752"); // Use the same secret key used in login
            } catch (err) {
              return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
            }
            console.log(decoded,"decoded");

      // Check if the Product exists
      const existingProduct = await Product.findById(ProductId);
      if (!existingProduct) {
          return res.status(404).json({ success: false, message: "Product not found" });
      }

      // Extract fields from request body
      const {
          name,
          description,
          amount,
          offeramount,
          color,
          weight,
          dimensions,
          sku,
          availability,
          isActive,
          createdBy,
          category,
          lang,
          brand_id,
          qty,
          subname,
          exta_add_item,
          is_type,
          itemid,
          options,
          rice_type
      } = req.body || {};

      // Handle image updates
      const imagePaths = req.files ? req.files.map(file => file.filename) : null;
      const images = req.fileUrls && req.fileUrls.length > 0 ? req.fileUrls[0] : existingProduct.images;

      // Update only the provided fields dynamically
      Object.assign(existingProduct, {
          ...(name !== undefined && { name }),
          ...(subname !== undefined && { subname }),
          ...(description !== undefined && { description }),
          ...(amount !== undefined && { amount }),
          ...(offeramount !== undefined && { offeramount }),
          ...(color !== undefined && { color }),
          ...(weight !== undefined && { weight }),
          ...(dimensions !== undefined && { dimensions }),
          ...(sku !== undefined && { sku }),
          ...(availability !== undefined && { availability }),
          ...(isActive !== undefined && { isActive }),
          ...(createdBy !== undefined && { createdBy }),
          ...(category !== undefined && { category }),
          ...(brand_id !== undefined && { brand_id }),
          ...(lang !== undefined && { lang }),
          ...(qty !== undefined && { qty }),
          ...(exta_add_item !== undefined && { exta_add_item }),
          ...(is_type !== undefined && { is_type }),
          ...(itemid !== undefined && { itemid }),
          ...(options !== undefined && { options }),
          ...(rice_type !== undefined && { rice_type }),
          ...(images !== undefined && { images }),
      });

      // Save the updated Product
      const updatedProduct = await existingProduct.save();

      res.status(200).json({ success: true, product: updatedProduct });

  } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ success: false, error: "Server error" });
  }
};

  

// Delete a specific Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const ProductId = req.params.id;

    // Check if the Product exists
    const existingProduct = await Product.findById(ProductId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Remove the Product from the database
    await Product.deleteOne({ _id: ProductId });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
