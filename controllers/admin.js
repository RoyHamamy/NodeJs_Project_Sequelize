const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProducts = (req, res, next) => {
  res.render("admin/editProduct", {
    pageTitle: "Add a new Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  let url;
  if (req.body.type == "Book") {
    url =
      "https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.286";
  }
  if (req.body.type == "Candle") {
    url = "https://indymaven.com/wp-content/uploads/2021/05/Candles-lede.jpg";
  }
  if (req.body.type == "Picture") {
    url =
      "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2RpZ2l0YWwtcGljdHVyZS1mcmFtZS0xYS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjI5MH0sInRvRm9ybWF0IjoiYXZpZiJ9fQ==";
  }
  if (req.body.type == "Sculpture") {
    url =
      "https://cdn.exoticindia.com/images/products/thumbnails/t400x300/sculptures/xt01.jpg";
  }
  if (req.body.type == "Other") {
    url =
      "https://m.media-amazon.com/images/I/51-TrKw+YtL._AC_SX300_SY300_.jpg";
  }
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      type: url,
      description: description,
      isFavorite: false,
    })
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/editProduct", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  let url;
  if (req.body.type == "Book") {
    url =
      "https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.286";
  }
  if (req.body.type == "Candle") {
    url = "https://indymaven.com/wp-content/uploads/2021/05/Candles-lede.jpg";
  }
  if (req.body.type == "Picture") {
    url =
      "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2RpZ2l0YWwtcGljdHVyZS1mcmFtZS0xYS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjI5MH0sInRvRm9ybWF0IjoiYXZpZiJ9fQ==";
  }
  if (req.body.type == "Sculpture") {
    url =
      "https://cdn.exoticindia.com/images/products/thumbnails/t400x300/sculptures/xt01.jpg";
  }
  if (req.body.type == "Other") {
    url =
      "https://m.media-amazon.com/images/I/51-TrKw+YtL._AC_SX300_SY300_.jpg";
  }
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.type = url;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
