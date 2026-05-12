package unpsjb.labprog.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Equipo {
    @Id
    private String codigo;
    
    private Integer capacidad;

    @ManyToOne
    private TipoEquipo tipo;
}