package com.kubawach.sport.leaderboard.resource;

import java.util.List;

import com.kubawach.sport.leaderboard.model.ClassificationUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kubawach.sport.leaderboard.model.Classification;
import com.kubawach.sport.leaderboard.model.PositionMapping;
import com.kubawach.sport.leaderboard.service.MainService;

@RestController
public class ClassificationResource {	
	
	@Autowired private MainService service;
	
	@GetMapping("/api/v1/competition/{competition}/classification")
	public List<Classification> classifications(@PathVariable String competition) {
		
		return service.classificationsFor(competition);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification")
	public Classification saveNewClassification(@PathVariable String competition, @RequestBody ClassificationUpdate classification) {
		
		return service.addClassification(competition, classification);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification/{classification}/positionMapping")
	public Classification savePositionMapping(@PathVariable String competition, @PathVariable String classification, @RequestBody PositionMapping positionMapping) {
		
		return service.savePositionMapping(competition, classification, positionMapping);
	}
}
