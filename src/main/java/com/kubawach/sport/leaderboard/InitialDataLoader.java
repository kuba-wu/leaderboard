package com.kubawach.sport.leaderboard;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.kubawach.sport.leaderboard.model.Competition;
import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.model.SingleResult;
import com.kubawach.sport.leaderboard.service.MainService;

@Configuration
public class InitialDataLoader {

	private final DateFormat DATE = new SimpleDateFormat("yyyy-MM-dd");
	
	private final Competition[] COMPETITIONS = new Competition[]{
			new Competition("IC Race"), new Competition("IC Podhale"), new Competition("Podhale Tour")};
	
	private final String[] CLASSIFICATIONS = new String[] {"Mountain", "General", "Black Horse"};
	
	private final List<Results> RESULTS = new ArrayList<>(Arrays.asList(new Results[]{
			new Results(parse("2019-01-10"), Arrays.asList(new SingleResult[] {
					new SingleResult("staszek", "1"), new SingleResult("zbyszek","3"), new SingleResult("jarek", "2")})),
			new Results(parse("2019-01-11"), Arrays.asList(new SingleResult[] {
					new SingleResult("staszek", "3"), new SingleResult("zbyszek","1"), new SingleResult("jarek", "2")})), 
			new Results(parse("2019-01-12"), Arrays.asList(new SingleResult[] {
					new SingleResult("staszek", "3"), new SingleResult("zbyszek","1"), new SingleResult("jarek", "2")}))
	}));
	
	private final Date parse(String string) {
		try {
			return DATE.parse(string);
		} catch (ParseException e) {
			return null;
		}
	}
	
	@Autowired private MainService mainService;
	
	@PostConstruct
	public void loadResults() {
		for (Competition competition : COMPETITIONS) {
			mainService.addCompetition(competition);
		}
		for (String classification : CLASSIFICATIONS) {
			mainService.addClassification("IC Race", classification);
		}
		for (Results results : RESULTS) {
			mainService.addResult("IC Race", "General", results);
		}
	}
}
