package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.model.Cliente;
import unpsjb.labprog.backend.business.ClienteRepository;
import unpsjb.labprog.backend.Response; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientePresenter {

    @Autowired
    private ClienteRepository repository;

    @PostMapping
    public ResponseEntity<Object> guardar(@RequestBody Cliente cliente) {
        try {
            repository.save(cliente);
            String mensaje = "Cliente " + cliente.getRazonSocial() + 
                             " (" + cliente.getCuit() + ") registrado correctamente";
            
            return Response.response(HttpStatus.OK, mensaje, cliente);
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
        List<Cliente> lista = repository.findAll();
        response.put("data", lista);
        response.put("status", 200);
        return response;
    }
}