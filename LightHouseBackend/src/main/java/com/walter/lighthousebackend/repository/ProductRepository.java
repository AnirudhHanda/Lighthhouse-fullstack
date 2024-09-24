package com.walter.lighthousebackend.repository;

import com.walter.lighthousebackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This is a Spring Data JPA repository that provides methods to perform CRUD operations on `Product`.
 * In addition to basic CRUD operations, you can also search the products with a specific keyword.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {


    /**
     * Custom query to search products by any keyword. This query will look for the keyword match in product's name, description, brand and category.
     * @param keyword The keyword to search with.
     * @return a list of products that matches the given keyword.
     */
    @Query("SELECT p from Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProductsBykeyword(String keyword);
}
