package com.kubawach.sport.leaderboard.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.kubawach.sport.leaderboard.model.Position;
import com.kubawach.sport.leaderboard.model.PositionMapping;
import com.kubawach.sport.leaderboard.model.Results;
import com.kubawach.sport.leaderboard.model.SingleResult;


public class ClassificationRankingServiceTestCase {

    private ClassificationRankingService underTest;

    @Before
    public void setUp() {
        this.underTest = new ClassificationRankingService();
    }

    @Test
    public void shouldCalculateForSingleResult() throws Exception {
        // given
        List<Results> result = Arrays.asList(new Results(null, new Date(),
                Arrays.asList(new SingleResult("first", "1"), new SingleResult("second", "2"))));
        PositionMapping mapping = new PositionMapping(Arrays.asList(3, 2, 1));

        // when
        List<Position> positions = underTest.calculateFor(result, mapping);

        // then
        assertThat(positions).hasSize(2);
        assertThat(positions.get(0).getParticipant()).isEqualTo("first");
        assertThat(positions.get(0).getPoints()).isEqualTo(3);
        assertThat(positions.get(1).getParticipant()).isEqualTo("second");
        assertThat(positions.get(1).getPoints()).isEqualTo(2);
    }
}
