package com.ubb.auth.config.liquibase;

import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class LiquibaseConfigUtils {

    private static final String APP_NAME_PROPERTY = "appName";
    private static final String APP_NAME = "modern-store-client";

    public Properties getProperties() {
        var drriverProperties = new Properties();
        drriverProperties.put(APP_NAME_PROPERTY, APP_NAME);
        return drriverProperties;
    }

}
