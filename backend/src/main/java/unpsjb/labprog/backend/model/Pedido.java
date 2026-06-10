package unpsjb.labprog.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor  
@AllArgsConstructor 
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente") 
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "id_taller")
    private Taller taller; 

    private Integer cantidad;
    private LocalDate fechaPedido;   
    private LocalDate fechaEntrega;
}