package com.kubawach.sport.leaderboard.model;

import lombok.Data;

@Data
public class ResultsCategory implements HasName {

    private final String id;
    private final String name;
    private final ResultsType type;
}
