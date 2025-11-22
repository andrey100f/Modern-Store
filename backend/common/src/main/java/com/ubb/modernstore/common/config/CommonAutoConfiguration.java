package com.ubb.modernstore.common.config;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Import;

@AutoConfiguration
@Import(WebConfig.class)
public class CommonAutoConfiguration {
}
