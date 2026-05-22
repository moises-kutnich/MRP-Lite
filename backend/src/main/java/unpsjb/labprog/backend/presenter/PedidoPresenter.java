package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.*;
import unpsjb.labprog.backend.business.*;
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
        if (pedido.getTaller() == null && pedido.getProducto() != null) {
            Taller tallerAuto = planificadorService.encontrarTallerCapaz(pedido.getProducto());
            if (tallerAuto == null) {
                return Response.response(
                    HttpStatus.BAD_REQUEST, 
                    "No existe ningún taller capaz de planificar el producto", 
                    null
                );
            }
            pedido.setTaller(tallerAuto);
        } 
        else if (pedido.getTaller() != null && pedido.getProducto() != null) {
            Taller tallerManual = pedido.getTaller();
            boolean esCapaz = pedido.getProducto().getTareas().stream()
                .allMatch(tarea -> planificadorService.buscarEquipoEnTaller(tallerManual, tarea.getTipoEquipo()) != null);
            
            if (!esCapaz) {
                return Response.response(
                    HttpStatus.BAD_REQUEST, 
                    "El taller seleccionado no es capaz de planificar el producto", 
                    null
                );
            }
        }

        repository.save(pedido);
        
        if (pedido.getTaller() != null && pedido.getFechaEntrega() != null) {
            LocalDateTime limiteEntrega = pedido.getFechaEntrega().atStartOfDay();
            planificadorService.planificar(pedido, pedido.getTaller(), limiteEntrega);
        }

        return Response.response(HttpStatus.OK, "Pedido planificado con éxito", pedido);
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