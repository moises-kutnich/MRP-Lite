package unpsjb.labprog.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Taller {
    @Id
    private String codigo;
    
    private String nombre;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "taller_id")
    private List<Equipo> equipos = new ArrayList<>();

    public void agregarEquipo(Equipo equipo) {
        this.equipos.add(equipo);
    }
}