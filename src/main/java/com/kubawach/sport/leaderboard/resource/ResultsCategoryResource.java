package com.kubawach.sport.leaderboard.resource;

import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.model.ResultsCategory;
import com.kubawach.sport.leaderboard.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultsCategoryResource {
	
	@Autowired private MainService service;
	
	@GetMapping("/api/v1/competition/{competition}/category")
	public List<ResultsCategory> categories(@PathVariable String competition) {
		
		return service.categoriesFor(competition);
	}
	
	@PostMapping("/api/v1/competition/{competition}/category")
	public void saveNewCategory(@PathVariable String competition, @RequestBody ResultsCategory newCategory) {
		
		service.addCategory(competition, newCategory);
	}
}
