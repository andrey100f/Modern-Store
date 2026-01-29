package com.ubb.modernstore.model;

import com.ubb.modernstore.domain.OrderId;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = OrderId.COLLECTION_NAME)
@Data
public class Order {

    @Id
    private String id;

    @Field(name = OrderId.FIRST_NAME)
    private String firstName;

    @Field(name = OrderId.LAST_NAME)
    private String lastName;

    @Field(name = OrderId.ADDRESS)
    private String address;

    @Field(name = OrderId.CITY)
    private String city;

    @Field(name = OrderId.STATE)
    private String state;

    @Field(name = OrderId.ZIP)
    private String zip;

    @Field(name = OrderId.USER_ID)
    private String userId;

    @Field(name = OrderId.TOTAL)
    private Double total;

}
