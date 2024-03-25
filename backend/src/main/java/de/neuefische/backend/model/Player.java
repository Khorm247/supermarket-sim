package de.neuefische.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class Player {
    private String id;
    private String email;
    private Market market;
}
