package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Producto;
import unpsjb.labprog.backend.business.ProductoRepository;

@RestController
@RequestMapping("/rest/productos")
public class ProductoPresenter {

    @Autowired
    private ProductoRepository repository;

    @PostMapping
    public ResponseEntity<Object> guardar(@RequestBody Producto producto) {
        repository.save(producto);
        
        String mensaje = producto.getNombre() + " creado exitosamente";
        
        if (producto.getNombre().contains("Canasto") || producto.getNombre().contains("Pieza")) {
            mensaje = "Producto " + producto.getNombre() + " creado exitosamente";
        }

        return Response.response(HttpStatus.OK, mensaje, producto);
    }
}