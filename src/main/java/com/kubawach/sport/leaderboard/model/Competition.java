package com.kubawach.sport.leaderboard.model;

import lombok.Data;

@Data
public class Competition implements HasName {

	private final String id;
	private final String name;
}
