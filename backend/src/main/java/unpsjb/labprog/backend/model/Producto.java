package unpsjb.labprog.backend.model;

import lombok.*;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "producto_id")
    private List<Tarea> tareas;
}