package com.kubawach.sport.leaderboard.model;

import lombok.Data;

@Data
public class Position {

	private final int position;
	private final String participant;
	private final int points;
}
