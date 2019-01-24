package com.kubawach.sport.leaderboard.model;

import java.util.List;

import lombok.Data;

@Data
public class Classification {

	private final String name;
	private final List<Position> positions;
	
}
