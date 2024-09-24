package com.walter.lighthousebackend.service;

import com.walter.lighthousebackend.model.Product;
import com.walter.lighthousebackend.model.Review;
import com.walter.lighthousebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


/**
 * This is a service class that provides the business logic for product-related functionalities.
 * It includes methods to perform CRUD operations on Product and its reviews.
 */
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    /**
     * Retrieves all products from the repository.
     * @return a list of all the products.
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Adds a new product in the repository.
     * @param product The product details.
     * @param file The image file associated with the product.
     * @return the product that was added.
     * @throws IOException if there's an error during file processing.
     */
    public Product addProduct(Product product, MultipartFile file) throws IOException {
        product.setImageData(file.getBytes());
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        return productRepository.save(product);
    }

    /**
     * Updates an existing product in the repository.
     * @param product The updated product details.
     * @param file The updated image file associated with the product.
     * @return the product that was updated.
     * @throws IOException if there's an error during file processing.
     */
    public Product updateProduct(Product product, MultipartFile file) throws IOException {
        product.setImageData(file.getBytes());
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        return productRepository.save(product);
    }

    /**
     * Fetches a single product from the repository.
     * @param id The Id of the product.
     * @return the product with the given Id.
     */
    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    /**
     * Deletes a product from the repository.
     * @param id The Id of the product.
     */
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    /**
     * Adds a review to a given product.
     * @param product The product to which the review is added.
     * @param review The review to be added.
     */
    public void addProductReview(Product product, Review review) {
        product.getReviews().add(review);

        int totalStars = 0;
        for (Review r : product.getReviews()) {
            totalStars += r.getStars();
        }

        double newRating = (double) totalStars / product.getReviews().size();
        product.setRating(newRating);

        productRepository.save(product);
    }

    /**
     * Finds products based on a keyword.
     * @param keyword The keyword based on which products are searched.
     * @return the list of products that match the keyword.
     */
    public List<Product> searchProducts(String keyword
    ) {
        return productRepository.searchProductsBykeyword(keyword);
    }
}
