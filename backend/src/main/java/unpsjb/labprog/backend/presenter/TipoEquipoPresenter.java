package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.business.TipoEquipoRepository;
import unpsjb.labprog.backend.model.TipoEquipo;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/tipos-equipo")
@CrossOrigin(origins = "http://localhost:4200")
public class TipoEquipoPresenter {

    @Autowired
    private TipoEquipoRepository repository;

    @PostMapping
    public Map<String, String> guardar(@RequestBody TipoEquipo tipo) {
        repository.save(tipo);
        
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", "Tipo de equipo " + tipo.getNombre() + " registrado correctamente");
        return response;
    }
}