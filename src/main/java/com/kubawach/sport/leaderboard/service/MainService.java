package com.kubawach.sport.leaderboard.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kubawach.sport.leaderboard.model.Classification;
import com.kubawach.sport.leaderboard.model.Competition;
import com.kubawach.sport.leaderboard.model.Position;
import com.kubawach.sport.leaderboard.model.PositionMapping;
import com.kubawach.sport.leaderboard.model.Results;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class MainService {

	private final PositionMapping DEFAULT_MAPPING = new PositionMapping(Arrays.asList(3, 2, 1));
	
	private final Map<String, Map<String, List<Results>>> results = new HashMap<>();
	private final Map<String, Map<String, Classification>> classifications = new HashMap<>();
	private final Map<String, Competition> competitions = new HashMap<>();
	
	@Autowired private ClassificationRankingService classificationRankingService;
	
	public boolean addCompetition(Competition competition) {
		if (competitions.containsKey(competition.getName())) {
			log.warn("Competition "+competition.getName()+" already exists.");
			return false;
		}
		competitions.put(competition.getName(), competition);
		classifications.put(competition.getName(), new HashMap<>());
		results.put(competition.getName(), new HashMap<>());
		
		return true;
	}
	
	public List<Competition> competitions() {
		return competitions.values()
				.stream()
				.sorted((c1, c2) -> c1.getName().compareTo(c2.getName())).collect(Collectors.toList());
	}
	
	public Classification addClassification(String competition, String classification) {
		if (!competitions.containsKey(competition)) {
			log.warn("Competition: "+competition+" not found");
			return null;
		}
		if (classifications.get(competition).containsKey(classification)) {
			log.warn("Classification: "+classification+" already set for competition: "+competition);
			return null;
		}
		
		Classification newClassification = new Classification(classification, Collections.emptyList(), DEFAULT_MAPPING);
		classifications.get(competition).put(classification, newClassification);
		results.get(competition).put(classification, new ArrayList<>());
		
		log.info("Added classification: "+classification+" to competition: "+competition);
		return newClassification;
	}
	
	public List<Classification> classificationsFor(String competition) {
		if (!competitions.containsKey(competition)) {
			log.warn("Competition "+competition+" not found. Returning empty list.");
			return Collections.emptyList();
		}
		return classifications.get(competition).values()
				.stream()
				.sorted((c1, c2) -> c1.getName().compareTo(c2.getName())).collect(Collectors.toList());
	}
	
	public boolean addResult(String competition, String classification, Results result) {
		
		if (!competitions.containsKey(competition)) {
			log.warn("Competition: "+competition+" not found");
			return false;
		}
		
		if (!classifications.get(competition).containsKey(classification)) {
			log.warn("Classification: "+classification+" not found");
			return false;
		}
		
		results.get(competition).get(classification).add(result);
		// update classifications
		updateClassification(competition, classification);
		return true;
	}
	
	public Classification savePositionMapping(String competition, String classification, PositionMapping mapping) {
		if (!classifications.containsKey(competition) || !classifications.get(competition).containsKey(classification)) {
			log.warn("Competition: "+competition+" or Classification: "+classification+" not found");
			return null;
		}
		
		Classification newClassification = classifications.get(competition).get(classification).forMapping(mapping);
		classifications.get(competition).put(classification, newClassification);
		return updateClassification(competition, classification);
	}
	
	private Classification updateClassification(String competition, String classificationName) {

		Classification classification = classifications.get(competition).get(classificationName);
		PositionMapping resultToPoints = classification.getMapping();
		List<Position> positions = classificationRankingService.calculateFor(results.get(competition).get(classificationName), resultToPoints);
		
		Classification updated = new Classification(classificationName, positions, resultToPoints);
		classifications.get(competition).put(classificationName, updated);
		return updated;
	}
	
	public List<Results> resultsFor(String competition, String classification) {
		if (!results.containsKey(competition) || !results.get(competition).containsKey(classification)) {
			log.warn("Competition: "+competition+" or Classification: "+classification+" not found");
			return Collections.emptyList();
		}
		return results.get(competition).get(classification);
	}
}
