package com.kubawach.sport.leaderboard;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import com.kubawach.sport.leaderboard.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.kubawach.sport.leaderboard.service.MainService;

@Configuration
public class InitialDataLoader {

	private final DateFormat DATE = new SimpleDateFormat("yyyy-MM-dd");
	
	private final Competition[] COMPETITIONS = new Competition[]{
			new Competition(id(),"IC Race"), new Competition(id(),"IC Podhale"), new Competition(id(),"Podhale Tour")};
	
	private final ResultsCategory[] CATEGORIES = new ResultsCategory[]{
			new ResultsCategory(id(), "Finish", ResultsType.TIME),
			new ResultsCategory(id(), "Sanka", ResultsType.POSITION),
			new ResultsCategory(id(), "Regulice", ResultsType.POSITION),
			new ResultsCategory(id(), "Black Horse", ResultsType.POSITION)};

	private final ClassificationUpdate[] CLASSIFICATIONS = new ClassificationUpdate[] {
			new ClassificationUpdate("Mountain", null, ResultsType.POSITION, names()),
			new ClassificationUpdate("General", null, ResultsType.TIME, names()),
			new ClassificationUpdate("Black Horse", null, ResultsType.POSITION, names())};
	
	private final List<Results> RESULTS = new ArrayList<>(Arrays.asList(new Results[]{
			new Results(parse("2019-01-10"), Arrays.asList(new SingleResult[] {
					new SingleResult("staszek", "1"), new SingleResult("zbyszek","3"), new SingleResult("jarek", "2")})),
			new Results(parse("2019-01-11"), Arrays.asList(new SingleResult[] {
					new SingleResult("staszek", "3"), new SingleResult("zbyszek","1"), new SingleResult("jarek", "2")})), 
			new Results(parse("2019-01-12"), Arrays.asList(new SingleResult[] {
					new SingleResult("staszek", "3"), new SingleResult("zbyszek","1"), new SingleResult("jarek", "2")}))
	}));

	private final List<String> names() {
		return Arrays.stream(CATEGORIES).map(category -> category.getName()).collect(Collectors.toList());
	}

	private final Date parse(String string) {
		try {
			return DATE.parse(string);
		} catch (ParseException e) {
			return null;
		}
	}

	private final String id() {
		return UUID.randomUUID().toString();
	}
	
	@Autowired private MainService mainService;
	
	@PostConstruct
	public void loadResults() {
		for (Competition competition : COMPETITIONS) {
			mainService.addCompetition(competition);
		}
		for (ResultsCategory category : CATEGORIES) {
			mainService.addCategory("IC Race", category);
		}
		for (ClassificationUpdate classification : CLASSIFICATIONS) {
			mainService.addClassification("IC Race", classification);
		}
		for (Results results : RESULTS) {
			mainService.addResult("IC Race", "Finish", results);
		}
	}
}
