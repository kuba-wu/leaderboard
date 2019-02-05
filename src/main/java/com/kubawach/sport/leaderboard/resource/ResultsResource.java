package com.kubawach.sport.leaderboard.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.service.MainService;

@RestController
public class ResultsResource {	
	
	@Autowired private MainService service;
	
	@GetMapping("/api/v1/competition/{competition}/classification/{classification}/results")
	public List<Results> results(@PathVariable String competition, @PathVariable String classification) {
		
		return service.resultsFor(competition, classification);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification/{classification}/results")
	public void saveNewResults(@PathVariable String competition, @PathVariable String classification, @RequestBody Results newResults) {
		
		service.addResult(competition, classification, newResults);
	}
}
