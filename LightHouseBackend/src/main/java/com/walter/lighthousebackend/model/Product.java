package com.walter.lighthousebackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * This is a model class that represents a Product in the application.
 * It includes various information about the product and its review.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    /**
     * The unique identifier for the product.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    /**
     * The product's name.
     */
    private String name;
    /**
     * The price of the product.
     */
    private BigDecimal price;
    /**
     * A description of the product.
     */
    private String description;
    /**
     * The brand of the product.
     */
    private String brand;
    /**
     * The category of the product.
     */
    private String category;
    /**
     * Boolean flag indicating whether the product is in stock or not.
     */
    private boolean inStock;
    /**
     * The stock count of the product.
     */
    private int stock;
    /**
     * The date related to the product.
     * The format for the date is `dd-mm-yyyy`.
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy")
    private Date date;
    /**
     * The average rating of the product.
     */
    private double rating;

    /**
     * The reviews made for the product.
     */
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    /**
     * The name of the product image.
     */
    private String imageName;
    /**
     * The type of the product image.
     */
    private String imageType;

    /**
     * The data of the product image.
     */
    @Lob
    @Column(columnDefinition = "oid")
    private byte[] imageData;
}
