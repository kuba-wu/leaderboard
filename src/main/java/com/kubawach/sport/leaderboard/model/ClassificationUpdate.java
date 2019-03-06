package com.kubawach.sport.leaderboard.model;

import lombok.Data;

import java.util.List;

@Data
public class ClassificationUpdate implements HasName {

	private final String name;
	private final PositionMapping mapping;
	private final ResultsType resultsType;
	private final List<String> categoryNames;
}
