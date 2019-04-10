package com.kubawach.sport.leaderboard.service;

import java.util.*;
import java.util.stream.Collectors;

import com.kubawach.sport.leaderboard.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

import static java.util.Comparator.comparing;

@Service
@Log4j2
public class MainService {

	private final PositionMapping DEFAULT_MAPPING = new PositionMapping(Arrays.asList(3, 2, 1));
	
	private final Map<String, Map<String, List<Results>>> results = new HashMap<>();
	private final Map<String, Map<String, Classification>> classifications = new HashMap<>();
	private final Map<String, Competition> competitions = new HashMap<>();
	private final Map<String, Map<String, ResultsCategory>> categories = new HashMap<>();
	
	@Autowired private ClassificationRankingService classificationRankingService;

	private final String id() {
		return UUID.randomUUID().toString();
	}

	public boolean addCompetition(Competition competition) {
		if (competitions.containsKey(competition.getName())) {
			log.warn("Competition "+competition.getName()+" already exists.");
			return false;
		}
		competitions.put(competition.getName(), competition);
		classifications.put(competition.getName(), new HashMap<>());
		results.put(competition.getName(), new HashMap<>());
		categories.put(competition.getName(), new HashMap<>());
		
		return true;
	}
	
	public List<Competition> competitions() {
		return competitions.values()
				.stream()
				.sorted(comparing(Competition::getName)).collect(Collectors.toList());
	}

	private List<ResultsCategory> categoriesByNames(Map<String, ResultsCategory> categoryMap, ResultsType type, List<String> categoryNames) {

		return categoryNames.stream()
				.map(name -> categoryMap.get(name))
				.filter(Objects::nonNull)
				.filter(category -> type.equals(category.getType()))
				.collect(Collectors.toList());
	}

	public Classification addClassification(String competition, ClassificationUpdate dto) {

		String name = dto.getName();
		if (!competitions.containsKey(competition)) {
			log.warn("Competition: "+competition+" not found");
			return null;
		}
		if (classifications.get(competition).containsKey(name)) {
			log.warn("Classification: "+name+" already set for competition: "+competition);
			return null;
		}

		PositionMapping mapping = (dto.getMapping() == null ? DEFAULT_MAPPING : dto.getMapping());
		List<ResultsCategory> categories = categoriesByNames(this.categories.get(competition), dto.getResultsType(), dto.getCategoryNames());
		Classification newClassification = new Classification(id(), name, Collections.emptyList(), mapping, dto.getResultsType(), categories);
		classifications.get(competition).put(name, newClassification);
		// update ranking
		updateClassification(competition, name);
		
		log.info("Added classification: "+name+" to competition: "+competition);
		return newClassification;
	}
	
	public List<Classification> classificationsFor(String competition) {
		if (!competitions.containsKey(competition)) {
			log.warn("Competition "+competition+" not found. Returning empty list.");
			return Collections.emptyList();
		}
		return sorted(classifications.get(competition).values());
	}

	public Classification classification(String competition, String classificationName) {
		if (!competitions.containsKey(competition)) {
			log.warn("Competition "+competition+" not found. Returning null.");
			return null;
		}
		return classifications.get(competition).get(classificationName);
	}
	
	public Results addResult(String competition, String resultCategory, Results result) {
		
		if (!competitions.containsKey(competition)) {
			log.warn("Competition: "+competition+" not found");
			return null;
		}
		
		if (!categories.get(competition).containsKey(resultCategory)) {
			log.warn("Result category: "+resultCategory+" not found");
			return null;
		}
		
		results.get(competition).get(resultCategory).add(result);
		// update relevant classifications
		List<Classification> classifications = classificationsFor(competition);
		for (Classification classification : classifications) {
			updateClassification(competition, classification.getName());
		}
		return result;
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

	private List<Results> resultsForCategories(String competition, List<ResultsCategory> categories) {
		Map<String, List<Results>> resultMap = results.get(competition);
		return categories.stream()
				.map(category -> resultMap.get(category.getName()))
				.flatMap(List::stream)
				.collect(Collectors.toList());
	}

	private Classification updateClassification(String competition, String classificationName) {

		Classification classification = classifications.get(competition).get(classificationName);
		PositionMapping resultToPoints = classification.getMapping();
		List<Results> allResults = resultsForCategories(competition, classification.getCategories());
		List<Position> ranking = classificationRankingService.calculateFor(allResults, resultToPoints);
		
		Classification updated = classification.forRanking(ranking);
		classifications.get(competition).put(classificationName, updated);
		return updated;
	}
	
	public List<Results> resultsFor(String competition, String resultsCategory) {
		if (!results.containsKey(competition) || !results.get(competition).containsKey(resultsCategory)) {
			log.warn("Competition: "+competition+" or Results category: "+resultsCategory+" not found");
			return Collections.emptyList();
		}
		return results.get(competition).get(resultsCategory);
	}

	public List<ResultsCategory> categoriesFor(String competition) {
		if (!competitions.containsKey(competition)) {
			log.warn("Competition "+competition+" not found. Returning empty list.");
			return Collections.emptyList();
		}
		return sorted(categories.get(competition).values());

	}

	private <T extends HasName> List<T> sorted(Collection<T> values) {
		return values
				.stream()
				.sorted((c1, c2) -> c1.getName().compareTo(c2.getName())).collect(Collectors.toList());
	}

	public ResultsCategory addCategory(String competition, ResultsCategory newCategory) {
		if (!competitions.containsKey(competition)) {
			log.warn("Competition: "+competition+" not found");
			return null;
		}
		if (categories.get(competition).containsKey(newCategory.getName())) {
			log.warn("Category: "+newCategory.getName()+" already set for competition: "+competition);
			return null;
		}

		categories.get(competition).put(newCategory.getName(), newCategory);
		results.get(competition).put(newCategory.getName(), new ArrayList<>());

		log.info("Added category: "+newCategory+" to competition: "+competition);
		return newCategory;
	}

	public boolean removeCompetition(String competitionName) {
		if (!competitions.containsKey(competitionName)) {
			log.warn("Competition "+competitionName+" does not exists.");
			return false;
		}
		competitions.remove(competitionName);
		classifications.remove(competitionName);
		results.remove(competitionName);
		categories.remove(competitionName);

		return true;
	}
}
