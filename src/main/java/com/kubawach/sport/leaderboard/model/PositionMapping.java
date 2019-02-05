package com.kubawach.sport.leaderboard.model;

import java.util.List;

import lombok.Data;

@Data
public class PositionMapping {

	private final List<Integer> positionToPoints;
	
	public int pointsForPosition(int position) {
		return (positionToPoints.size() >= position ? positionToPoints.get(position-1) : 0);
	}
}
