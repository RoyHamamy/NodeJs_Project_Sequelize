const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");
const Cart = require("./models/cart");
const Product = require("./models/product");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// We Use Express in this app:
const app = express();

// This will set our view engine to ejs:
app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));

// Now we import CSS files from Public Folder :
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Roy", email: "royh69@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    //Start app in port 3000:
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

