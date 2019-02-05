package com.kubawach.sport.leaderboard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.kubawach.sport.leaderboard.model.Position;
import com.kubawach.sport.leaderboard.model.PositionMapping;
import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.model.SingleResult;

@Service
public class ClassificationRankingService {

	public List<Position> calculateFor(List<Results> allResults, PositionMapping classificationMapping) {
		Map<String, int[]> resultMap = calculateParticipantToPosition(allResults, classificationMapping);
		return mapToPosition(resultMap);
	}
	
	private Map<String, int[]> calculateParticipantToPosition(List<Results> allResults, PositionMapping resultToPoints) {
		
		Map<String, int[]> resultMap = new HashMap<>();
		for (Results classResult : allResults) {
			for (SingleResult single : classResult.getResults()) {
				if (!resultMap.containsKey(single.getParticipant())) {
					resultMap.put(single.getParticipant(), new int[1]);
				}
				resultMap.get(single.getParticipant())[0] += resultToPoints.pointsForPosition(Integer.parseInt(single.getResult()));
			}
		}
		return resultMap;
	}
	
	private List<Position> mapToPosition(Map<String, int[]> participantToPointsMap) {
		List<Map.Entry<String, int[]>> sortedResults = participantToPointsMap.entrySet().stream()
			       .sorted((c1, c2) -> c2.getValue()[0] - c1.getValue()[0]).collect(Collectors.toList());
		
		return IntStream.range(0, sortedResults.size())
		         .mapToObj(i -> new Position(i+1, sortedResults.get(i).getKey(), sortedResults.get(i).getValue()[0]))
		         .collect(Collectors.toList());
	}
}
