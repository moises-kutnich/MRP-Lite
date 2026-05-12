package unpsjb.labprog.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Tarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombreTarea;
    private Integer orden;
    private Integer tiempo;

    @ManyToOne
    private TipoEquipo tipoEquipo;
}