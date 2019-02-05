package com.kubawach.sport.leaderboard.model;

import java.util.List;

import lombok.Data;

@Data
public class Classification {

	private final String name;
	private final List<Position> positions;
	private final PositionMapping mapping;
	
	public Classification forMapping(PositionMapping newMapping) {
		return new Classification(name, positions, newMapping);
	}
}
