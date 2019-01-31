package com.kubawach.sport.leaderboard.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kubawach.sport.leaderboard.model.Classification;
import com.kubawach.sport.leaderboard.model.Competition;
import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.service.MainService;

@RestController
public class MainResource {	
	
	@Autowired private MainService service;
	
	@GetMapping("/api/v1/competition")
	public List<Competition> allCompetitions() {
		
		return service.competitions();
	}
	
	@PostMapping("/api/v1/competition")
	public void saveNewCompetition(@RequestBody Competition competition) {
		
		service.addCompetition(competition);
	}
	
	@GetMapping("/api/v1/competition/{competition}/classification")
	public List<Classification> classifications(@PathVariable String competition) {
		
		return service.classificationsFor(competition);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification")
	public void saveNewClassification(@PathVariable String competition, @RequestBody Classification classification) {
		
		service.addClassification(competition, classification.getName());
	}
	
	@GetMapping("/api/v1/competition/{competition}/classification/{classification}/results")
	public List<Results> results(@PathVariable String competition, @PathVariable String classification) {
		
		return service.resultsFor(competition, classification);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification/{classification}/results")
	public void saveNewResults(@PathVariable String competition, @PathVariable String classification, @RequestBody Results newResults) {
		
		service.addResult(competition, classification, newResults);
	}
}
