package com.kubawach.sport.leaderboard.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;

import org.junit.Test;

public class PositionMappingTestCase {

	@Test
	public void shouldGetPointsForPosition() throws Exception {
		// given 
		PositionMapping underTest = new PositionMapping(Arrays.asList(3, 2, 1));

		// when
		int first = underTest.pointsForPosition(1);
		int second = underTest.pointsForPosition(2);
		int third = underTest.pointsForPosition(3);
		
		// then	
		assertThat(first).isEqualTo(3);
		assertThat(second).isEqualTo(2);
		assertThat(third).isEqualTo(1);
	}
}
