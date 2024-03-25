package de.neuefische.backend.repository;

import de.neuefische.backend.model.Market;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketRepository extends MongoRepository<Market, String>{
}
