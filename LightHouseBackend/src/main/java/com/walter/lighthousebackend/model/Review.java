package com.walter.lighthousebackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * This is a model class that represents a Product's Review in the application.
 * It includes various information about the review and the associated product.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Component
public class Review {
    /**
     * The unique identifier for the review.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    /**
     * The title of the review.
     */
    private String title;
    /**
     * The content of the review.
     */
    private String content;
    /**
     * The author of the review.
     */
    private String author;
    /**
     * The date the review was written.
     */
    private String date;
    /**
     * The star rating given for the product in the review.
     */
    private int stars;

    /**
     * The product associated with the review.
     */
    @JsonIgnore
    @ManyToOne
    private Product product;
}
