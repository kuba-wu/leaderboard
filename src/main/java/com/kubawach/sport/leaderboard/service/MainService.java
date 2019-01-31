package com.kubawach.sport.leaderboard.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.kubawach.sport.leaderboard.model.Classification;
import com.kubawach.sport.leaderboard.model.Competition;
import com.kubawach.sport.leaderboard.model.Position;
import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.model.SingleResult;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class MainService {

	private final Map<Integer, Integer> positionToPoints = Stream.of(new Integer[][] {
			  { 1, 3 }, 
			  { 2, 2 },
			  { 3, 1 }
			}).collect(Collectors.toMap(data -> data[0], data -> data[1]));
	
	private final Map<String, Map<String, List<Results>>> results = new HashMap<>();
	private final Map<String, Map<String, Classification>> classifications = new HashMap<>();
	private final Map<String, Competition> competitions = new HashMap<>();
	
	public boolean addCompetition(Competition competition) {
		if (competitions.containsKey(competition.getName())) {
			return false;
		}
		competitions.put(competition.getName(), competition);
		classifications.put(competition.getName(), new HashMap<String, Classification>());
		return true;
	}
	
	public List<Competition> competitions() {
		return new ArrayList<Competition>(competitions.values());
	}
	
	public boolean addClassification(String competition, String classification) {
		if (!classifications.containsKey(competition)) {
			log.warn("Competition: "+competition+" not found");
			return false;
		}
		if (classifications.get(competition).containsKey(classification)) {
			log.warn("Classification: "+classification+" already set for competition: "+competition);
			return false;
		}
		classifications.get(competition).put(classification, new Classification(classification, Collections.emptyList()));
		
		log.info("Added classification: "+classification+" to competition: "+competition);
		return true;
	}
	
	public List<Classification> classificationsFor(String competition) {
		if (!classifications.containsKey(competition)) {
			return Collections.emptyList();
		}
		return new ArrayList<>(classifications.get(competition).values());
	}
	
	public void addResult(String competition, String classification, Results result) {
		
		if (!results.containsKey(competition)) {
			results.put(competition, new HashMap<>());
		}
		if (!results.get(competition).containsKey(classification)) {
			results.get(competition).put(classification, new ArrayList<>());
		}
		results.get(competition).get(classification).add(result);
		
		// update classifications
		updateClassification(competition, classification);
	}
	
	private void updateClassification(String competition, String classification) {
		if (!classifications.containsKey(competition)) {
			classifications.put(competition, new HashMap<>());
		}

		Map<String, int[]> resultMap = new HashMap<>();
		List<Results> classResults = results.get(competition).get(classification);
		for (Results classResult : classResults) {
			for (SingleResult single : classResult.getResults()) {
				if (!resultMap.containsKey(single.getParticipant())) {
					resultMap.put(single.getParticipant(), new int[1]);
				}
				resultMap.get(single.getParticipant())[0] += positionToPoints.get(Integer.valueOf(single.getResult()));
			}
		}
		
		List<Map.Entry<String, int[]>> sortedResults = resultMap.entrySet().stream()
			       .sorted(resultsComparator()).collect(Collectors.toList());
		
		List<Position> positions = IntStream.range(0, sortedResults.size())
		         .mapToObj(i -> new Position(i+1, sortedResults.get(i).getKey(), sortedResults.get(i).getValue()[0]))
		         .collect(Collectors.toList());
		
		
		classifications.get(competition).put(classification, new Classification(classification, positions));
	}
	
	private Comparator<Map.Entry<String, int[]>> resultsComparator() {
		return (c1, c2) -> c2.getValue()[0] - c1.getValue()[0]; 
	}
	
	public List<Results> resultsFor(String competition, String classification) {
		if (!results.containsKey(competition) || !results.get(competition).containsKey(classification)) {
			return Collections.emptyList();
		}
		return results.get(competition).get(classification);
	}
}
