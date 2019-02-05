package com.kubawach.sport.leaderboard.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kubawach.sport.leaderboard.model.Competition;
import com.kubawach.sport.leaderboard.service.MainService;

@RestController
public class CompetitionResource {

	@Autowired private MainService service;
	
	@GetMapping("/api/v1/competition")
	public List<Competition> allCompetitions() {
		
		return service.competitions();
	}
	
	@PostMapping("/api/v1/competition")
	public void saveNewCompetition(@RequestBody Competition competition) {
		
		service.addCompetition(competition);
	}
}
