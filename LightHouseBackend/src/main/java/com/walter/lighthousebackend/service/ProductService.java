package com.walter.lighthousebackend.service;

import com.walter.lighthousebackend.model.Product;
import com.walter.lighthousebackend.model.Review;
import com.walter.lighthousebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product, MultipartFile file) throws IOException {
        product.setImageData(file.getBytes());
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        return productRepository.save(product);
    }

    public Product updateProduct(Product product, MultipartFile file) throws IOException {
        product.setImageData(file.getBytes());
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        return productRepository.save(product);
    }

    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

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

    public List<Product> searchProducts(String keyword
    ) {
        return productRepository.searchProductsBykeyword(keyword);
    }
}
