package com.kubawach.sport.leaderboard.resource;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kubawach.sport.leaderboard.model.Classification;
import com.kubawach.sport.leaderboard.model.Competition;
import com.kubawach.sport.leaderboard.model.Position;

@RestController
public class MainResource {

	@GetMapping("/api/v1/competition")
	public List<Competition> allCompetitions() {
		
		return Arrays.asList(new Competition[]{
				new Competition("IC Race"), new Competition("IC Podhale"), new Competition("Podhale Tour")});
	}
	
	@GetMapping("/api/v1/competition/{name}/classification")
	public List<Classification> classifications(@PathVariable String name) {
		
		return Arrays.asList(new Classification[]{
				new Classification("General", Arrays.asList(new Position[] {
						new Position(1, "staszek", 123), new Position(2, "zbyszek",11), new Position(3, "jarek", 5)})),
				new Classification("Mountain", null), 
				new Classification("Black Horse", null)});
	}
}
