package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Market;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MarketControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllMarkets_whenNoMarketsExist_thenReturnEmptyList() throws Exception {
        mvc.perform(get("/api/market"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getAllMarkets_whenMarketInList_thenReturnListMarkets() throws Exception {
        // Given
        String marketName = "marketName";

        MvcResult expectedJson = mvc.perform(post("/api/market")
                        .contentType("application/json")
                        .content(marketName))
                .andExpect(status().isCreated())
                .andReturn();

        List<Market> expected = List.of(objectMapper.readValue(expectedJson.getResponse().getContentAsString(), Market.class));

        // When
        MvcResult resultJson = mvc.perform(get("/api/market"))
                .andExpect(status().isOk())
                .andReturn();
        List<Market> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), Market[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void deleteMarket_whenGivenWrongId_thenThrowError() throws Exception {
        // Given
        String id = "nonExistentId";

        // When & Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/market/" + id))
            .andExpect(status().isNotFound());
    }

    @Test
    void deleteMarket_whenGivenCorrectId_thenDeleteMarket() throws Exception {
        // Given
        String marketName = "marketName";
        MvcResult marketJson = mvc.perform(post("/api/market")
                .contentType("application/json")
                .content(marketName))
                .andExpect(status().isCreated())
                .andReturn();
        Market market = objectMapper.readValue(marketJson.getResponse().getContentAsString(), Market.class);

        // When
        mvc.perform(MockMvcRequestBuilders.delete("/api/market/" + market.getMarketId()))
                .andExpect(status().isOk());

        // Then
        mvc.perform(get("/api/market"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }
}

