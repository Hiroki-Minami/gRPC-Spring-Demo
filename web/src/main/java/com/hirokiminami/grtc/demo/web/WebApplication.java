package com.hirokiminami.grtc.demo.web;

import com.hirokiminami.grtc.demo.web.config.GrpcProperties;
import com.hirokiminami.grtc.demo.web.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

//@EnableConfigurationProperties(RsaKeyProperties.class)
@EnableConfigurationProperties(value = {RsaKeyProperties.class, GrpcProperties.class})
@SpringBootApplication
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

}
