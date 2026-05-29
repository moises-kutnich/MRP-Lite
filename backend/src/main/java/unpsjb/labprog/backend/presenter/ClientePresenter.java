package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.model.Cliente;
import unpsjb.labprog.backend.business.ClienteRepository;
import unpsjb.labprog.backend.Response; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientePresenter {

    @Autowired
    private ClienteRepository repository;

    @PostMapping
    public ResponseEntity<Object> guardar(@RequestBody Cliente cliente) {
        repository.save(cliente);
        
        String mensaje = "Cliente " + cliente.getRazonSocial() + 
                         " (" + cliente.getCuit() + ") registrado correctamente";
        
        return Response.ok(null, mensaje);
    }
}