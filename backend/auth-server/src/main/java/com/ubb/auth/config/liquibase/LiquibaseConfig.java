package com.ubb.auth.config.liquibase;

import liquibase.Liquibase;
import liquibase.database.DatabaseFactory;
import liquibase.exception.LiquibaseException;
import liquibase.ext.mongodb.database.MongoLiquibaseDatabase;
import liquibase.resource.ClassLoaderResourceAccessor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class LiquibaseConfig {

    @Value("${spring.mongodb.uri}")
    private String url;

    private final LiquibaseConfigUtils configUtils;

    @Bean
    public Liquibase liquibase() throws LiquibaseException {
        var properties = configUtils.getProperties();
        MongoLiquibaseDatabase database = (MongoLiquibaseDatabase) DatabaseFactory.getInstance()
                .openDatabase(url, null, null, null, properties, null);
        database.setSupportsValidator(false);
        database.setAdjustTrackingTablesOnStartup(false);

        String LIQUIBASE_CHANGELOG = "db/main-changelog.xml";
        Liquibase liquibase = new Liquibase(LIQUIBASE_CHANGELOG, new ClassLoaderResourceAccessor(), database);

        liquibase.update("");

        return liquibase;
    }

}