package unpsjb.labprog.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Producto producto;

    @ManyToOne
    private Taller taller; 

    private Integer cantidad;
    private LocalDate fechaEntrega;
}