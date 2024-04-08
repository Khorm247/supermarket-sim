package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Inventory;
import de.neuefische.backend.repository.InventoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class InventoryControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Test
    void getAllInventories_whenNoInventoryExists_thenReturnEmptyList() throws Exception {
        mvc.perform(get("/api/inventory"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void getAllInventories_whenInventoriesInList_thenReturnListOfInventories() throws Exception {
        // Given
        List<Inventory> expected = List.of(
                Inventory.builder().id("1").playerId("1").build(),
                Inventory.builder().id("2").playerId("2").build(),
                Inventory.builder().id("3").playerId("3").build()
        );

        inventoryRepository.saveAll(expected);

        // When
        MvcResult resultJson = mvc.perform(get("/api/inventory"))
                .andExpect(status().isOk())
                .andReturn();
        List<Inventory> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), Inventory[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void deleteInventory_whenGivenWrongId_thenReturnNotFoundMessage() throws Exception {
        // Given
        String id = "nonExistentId";

        // Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/inventory/" + id))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Inventory with id nonExistentId does not exist"));
    }

    @Test
    void deleteInventory_whenGivenCorrectId_thenDeleteInventory() throws Exception {
        // Given
        Inventory existing = Inventory.builder().id("1").playerId("1").build();

        inventoryRepository.save(existing);

        // When & Then
        mvc.perform(MockMvcRequestBuilders.delete("/api/inventory/" + existing.getId()))
                .andExpect(status().isOk())
                .andExpect(content().string("Inventory deleted"));
    }
}