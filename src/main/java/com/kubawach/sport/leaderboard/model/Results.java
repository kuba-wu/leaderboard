package com.kubawach.sport.leaderboard.model;

import java.beans.ConstructorProperties;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class Results {

	private final String id;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private final Date date;
	private final List<SingleResult> results;

	@ConstructorProperties({"id", "date", "results"})
	public Results(String id, Date date, List<SingleResult> results) {
		this.id = (id == null ? UUID.randomUUID().toString() : id);
		this.date = date;
		this.results = results;
	}
}
