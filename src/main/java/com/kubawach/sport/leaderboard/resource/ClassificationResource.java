package com.kubawach.sport.leaderboard.resource;

import java.util.List;

import com.kubawach.sport.leaderboard.model.ClassificationUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kubawach.sport.leaderboard.model.Classification;
import com.kubawach.sport.leaderboard.model.PositionMapping;
import com.kubawach.sport.leaderboard.service.MainService;

@RestController
public class ClassificationResource {	
	
	@Autowired private MainService service;

	@GetMapping("/api/v1/competition/{competition}/classification/{classification}")
	public Classification classification(@PathVariable String competition, @PathVariable String classification) {
		return service.classification(competition, classification);
	}

	@GetMapping("/api/v1/competition/{competition}/classification")
	public List<Classification> classifications(@PathVariable String competition) {
		
		return service.classificationsFor(competition);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification")
	public Classification saveNewClassification(@PathVariable String competition, @RequestBody ClassificationUpdate classification) {
		
		return service.addClassification(competition, classification);
	}

	@DeleteMapping("/api/v1/competition/{competition}/classification/{classification}")
	public void removeClassification(@PathVariable String competition, @PathVariable String classification) {

		service.removeClassification(competition, classification);
	}
	
	@PostMapping("/api/v1/competition/{competition}/classification/{classification}/positionMapping")
	public Classification savePositionMapping(@PathVariable String competition, @PathVariable String classification, @RequestBody PositionMapping positionMapping) {
		
		return service.savePositionMapping(competition, classification, positionMapping);
	}
}
