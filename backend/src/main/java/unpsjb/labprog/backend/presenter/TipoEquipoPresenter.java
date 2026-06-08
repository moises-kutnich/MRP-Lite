package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.business.TipoEquipoRepository;
import unpsjb.labprog.backend.model.TipoEquipo;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/rest/tipos-equipos")
@CrossOrigin(origins = "http://localhost:4200")
public class TipoEquipoPresenter {

    @Autowired
    private TipoEquipoRepository repository;

    @GetMapping
    public Map<String, Object> listar() {
        Map<String, Object> response = new HashMap<>();
        List<TipoEquipo> lista = repository.findAll(); 
        
        response.put("data", lista);
        response.put("status", 200);
        return response;
    }

    @PostMapping
    public Map<String, Object> guardar(@RequestBody TipoEquipo tipo) {
        repository.save(tipo);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Tipo de equipo " + tipo.getNombre() + " registrado correctamente");
        response.put("status", 200);
        response.put("data", tipo);
        return response;
    }
}