package com.hirokiminami.grtc.demo.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
@ConfigurationProperties(prefix = "grpc.client")
public record GrpcProperties(String host, int port) {
}
