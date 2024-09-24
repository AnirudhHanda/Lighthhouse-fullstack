package com.walter.lighthousebackend.controller;

import com.walter.lighthousebackend.model.Product;
import com.walter.lighthousebackend.model.Review;
import com.walter.lighthousebackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.reactive.ReactiveMultipartProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * This is a REST controller for product-related functionalities.
 * It includes APIs to perform CRUD operations on Product and its reviews.
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Gets the list of all products.
     * @return list of products.
     */
    @GetMapping("/products")
    public ResponseEntity<?> getProducts() {
        List<Product> products = productService.getAllProducts();

        if(products.isEmpty()) {
            return new ResponseEntity<>("No Products yet", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    /**
     * Creates a new Product.
     * @param product The product details.
     * @param file The image file associated with the product.
     * @return response of the product creation process.
     */
    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile file) {
        Product savedProduct = null;
        System.out.println("Controller called");
        try {
            savedProduct = productService.addProduct(product, file);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Gets a single Product by its id.
     * @param id The id of the product.
     * @return product details.
     */
    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable int id) {
        Product product = productService.getProductById(id);

        if(product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    /**
     * Gets the image of a single Product by its id.
     * @param id The id of the product.
     * @return product's image.
     */
    @GetMapping("/product/{id}/image")
    public ResponseEntity<?> getProductImage(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if(product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product.getImageData(), HttpStatus.OK);
    }

    /**
     * Updates an existing Product.
     * @param product The updated product details.
     * @param file The updated image file associated with the product.
     * @return response of the product update process.
     */
    @PutMapping("/product")
    public ResponseEntity<?> updateProduct(@RequestPart Product product, @RequestPart MultipartFile file) {
        Product updatedProduct = null;

        try {
            updatedProduct = productService.addProduct(product, file);
            return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Deletes a product by its id.
     * @param id The id of the product.
     * @return response of the product deletion process.
     */
    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if(product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        productService.deleteProduct(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    /**
     * Adds a review to a product.
     * @param id The id of the product.
     * @param review The review to be added.
     * @return response of the review addition process.
     */
    @PostMapping("/product/{id}/review")
    public ResponseEntity<?> addReview(@PathVariable("id") int id, @RequestBody Review review) {
        Product product = productService.getProductById(id);
        if(product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        productService.addProductReview(product, review);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    /**
     * Searches for products based on a keyword.
     * @param keyword The keyword.
     * @return list of products that match the keyword.
     */
    @GetMapping("/products/search")
    public ResponseEntity<?> searchProducts(@RequestParam String keyword) {

        List<Product>  serachedProducts = productService.searchProducts(keyword);
        System.out.println("Searching with keyword: "+keyword);
        if(serachedProducts.isEmpty()) {
            return new ResponseEntity<>("No Such Product", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(serachedProducts, HttpStatus.OK);
    }
}
