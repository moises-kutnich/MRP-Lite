package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Pedido;
import unpsjb.labprog.backend.business.PedidoRepository;
import unpsjb.labprog.backend.business.PlanificadorService;
import unpsjb.labprog.backend.business.PlanificacionRepository;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/rest/pedidos")
public class PedidoPresenter {

    @Autowired
    private PedidoRepository repository;

    @Autowired
    private PlanificadorService planificadorService;

    @Autowired
    private PlanificacionRepository planificacionRepository;

    @PostMapping
    public ResponseEntity<Object> guardar(@RequestBody Pedido pedido) {
        repository.save(pedido);
        
        if (pedido.getTaller() != null && pedido.getFechaEntrega() != null) {
            LocalDateTime inicio = pedido.getFechaEntrega().atStartOfDay();
            planificadorService.planificar(pedido, pedido.getTaller(), inicio);
    }

        return Response.response(HttpStatus.OK, "Producto planificado con éxito", pedido);
    }

    @GetMapping("/planificacion/{idTaller}")
    public ResponseEntity<Object> obtenerPlanificacion(@PathVariable Long idTaller) {
        return Response.response(
            HttpStatus.OK, 
            "Datos de planificación recuperados", 
            planificacionRepository.findByTallerId(idTaller)
        );
    }
}