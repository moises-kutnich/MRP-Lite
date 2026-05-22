package unpsjb.labprog.backend.business;

import org.springframework.stereotype.Service;
import unpsjb.labprog.backend.model.Pedido;

@Service
public class AsignadorColorService {
    public String determinarColor(Pedido pedido) {
        if (pedido.getId() == null) return "#007bff";
        return (pedido.getId() % 2 == 0) ? "#dc3545" : "#007bff";
    }
}