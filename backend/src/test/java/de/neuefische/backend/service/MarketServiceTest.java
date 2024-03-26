package de.neuefische.backend.service;

import de.neuefische.backend.model.Market;
import de.neuefische.backend.repository.MarketRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MarketServiceTest {

    private final MarketRepository mockMarketRepository = mock(MarketRepository.class);

    private final MarketService marketService = new MarketService(mockMarketRepository);

    @Test
    void getAllMarkets() {
        // Given
        List<Market> expected = List.of(
                new Market("1", "Market1", new BigDecimal(100), 100, 0, 10, 0, null),
                new Market("2", "Market2", new BigDecimal(100), 100, 0, 10, 0, null),
                new Market("3", "Market3", new BigDecimal(100), 100, 0, 10, 0, null)
        );
        // When
        when(mockMarketRepository.findAll()).thenReturn(expected);
        List<Market> actual = marketService.getAllMarkets();
        // Then
        assertEquals(expected, actual);
        verify(mockMarketRepository).findAll();
        verifyNoMoreInteractions(mockMarketRepository);
    }

    @Test
    void getAllMarkets_whenEmptyDb_thenReturnEmptyList(){
        // Given
        List<Market> expected = List.of();
        // When
        when(mockMarketRepository.findAll()).thenReturn(expected);
        List<Market> actual = marketService.getAllMarkets();
        // Then
        assertEquals(expected, actual);
        verify(mockMarketRepository).findAll();
        verifyNoMoreInteractions(mockMarketRepository);
    }

    @Test
    void addNewMarket_whenGivenMarketName_ThenReturnNewMarket() {
        // Given
        String marketName = "Market1";
        Market expected = new Market(null, marketName, new BigDecimal(100), 50, 0, 10, 0, List.of());
        // When
        when(mockMarketRepository.save(any())).thenReturn(expected);
        Market actual = marketService.addNewMarket(marketName);
        // Then
        assertEquals(expected, actual);
        verify(mockMarketRepository).save(expected);
        verifyNoMoreInteractions(mockMarketRepository);
    }

    @Test
    void renameMarket_returnMarketWithNewName_whenGivenNewNameWithMarketId() {
        // Given
        String marketId = "1";
        String newMarketName = "newMarketName";
        Market marketToUpdate = new Market("1", "oldName", new BigDecimal(100), 50, 0, 10, 0, List.of());
        Market expected = new Market("1", newMarketName, new BigDecimal(100), 50, 0, 10, 0, List.of());
        // When
        when(mockMarketRepository.findAll()).thenReturn(List.of(marketToUpdate));
        when(mockMarketRepository.save(any())).thenReturn(expected);
        Market actual = marketService.renameMarket(marketId, newMarketName);
        // Then
        assertEquals(expected, actual);
        verify(mockMarketRepository).findAll();
        verify(mockMarketRepository).save(expected);
        verifyNoMoreInteractions(mockMarketRepository);
    }

    @Test
    void deleteMarket_whenGivenMarketId_thenDeleteMarket() {
        String marketId = "1";
        // When
        when(mockMarketRepository.existsById(marketId)).thenReturn(true);
        marketService.deleteMarket(marketId);
        // Then
        verify(mockMarketRepository).existsById(marketId);
        verify(mockMarketRepository).deleteById(marketId);
        verifyNoMoreInteractions(mockMarketRepository);
    }

    @Test
    void deleteMarket_whenGivenWrongId_thenThrow() {
        // Given
        String id = "1";
        // When
        when(mockMarketRepository.existsById(id)).thenReturn(false);
        // Then
        assertThrows(NoSuchElementException.class, () -> marketService.deleteMarket(id));
        verify(mockMarketRepository).existsById(id);
        verifyNoMoreInteractions(mockMarketRepository);
    }
}
