package com.kubawach.sport.leaderboard.model;

import java.util.List;

import lombok.Data;

@Data
public class Classification implements HasName {

	private final String id;
	private final String name;
	private final List<Position> positions;
	private final PositionMapping mapping;
	private final ResultsType resultsType;
	private final List<ResultsCategory> categories;
	
	public Classification forMapping(PositionMapping newMapping) {
		return new Classification(id, name, positions, newMapping, resultsType, categories);
	}

	public Classification forRanking(List<Position> ranking) {
		return new Classification(id, name, ranking, mapping, resultsType, categories);
	}
}
