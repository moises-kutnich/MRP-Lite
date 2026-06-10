package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Producto;
import unpsjb.labprog.backend.business.ProductoRepository;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoPresenter {

    @Autowired
    private ProductoRepository repository;

    @PostMapping
    public ResponseEntity<Object> guardar(@RequestBody Producto producto) {
        try {
            repository.save(producto);
            String mensaje = producto.getNombre() + " creado exitosamente";
            
            if (producto.getNombre().contains("Canasto") || producto.getNombre().contains("Pieza")) {
                mensaje = "Producto " + producto.getNombre() + " creado exitosamente";
            }
            return Response.response(HttpStatus.OK, mensaje, producto);
        } catch (Exception e) {
            return Response.response(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Error en el servidor: " + e.getMessage(), 
                null
            );
        }
    }

    @GetMapping
    public Map<String, Object> listar() {
        Map<String, Object> response = new HashMap<>();
        List<Producto> lista = repository.findAll(); 
        response.put("data", lista);
        response.put("status", 200);
        return response;
    }
}