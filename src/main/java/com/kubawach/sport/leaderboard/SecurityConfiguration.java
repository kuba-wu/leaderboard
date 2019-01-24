package com.kubawach.sport.leaderboard;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration

public class SecurityConfiguration  {

	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
		return http
			.authorizeExchange()
				.anyExchange().permitAll().and()
			.build();
	}
}