package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.*;
import unpsjb.labprog.backend.business.*;
import java.util.Map;

@RestController
@RequestMapping("/rest")
public class TallerPresenter {

    @Autowired
    private TallerRepository repository;

    @Autowired
    private TipoEquipoRepository tipoRepo;

    // TAREA 2: Nuevo tipo de equipo
    @PostMapping("/tipo-equipo")
    public ResponseEntity<Object> guardarTipoEquipo(@RequestBody TipoEquipo tipo) {
        tipoRepo.save(tipo);
        return Response.response(HttpStatus.OK, 
            "Tipo de equipo " + tipo.getNombre() + " registrado correctamente", 
            tipo);
    }

    // TAREA 3 - Escenario 1: Nuevo taller sin equipos
    @PostMapping("/talleres")
    public ResponseEntity<Object> guardarTaller(@RequestBody Taller taller) {
        repository.save(taller);
        return Response.response(HttpStatus.OK, 
            "Taller " + taller.getCodigo() + " ingresado correctamente", 
            taller);
    }

    // TAREA 3 - Escenario 2: Agregar equipos a los talleres existente
    @PutMapping("/talleres/{codigoTaller}/equipos")
    public ResponseEntity<Object> actualizarTaller(@PathVariable String codigoTaller, @RequestBody Map<String, Object> payload) {
        Taller taller = repository.findById(codigoTaller).orElse(null);
        
        if (taller == null) {
            return Response.notFound("Taller no encontrado");
        }

        String nombreTipo = (String) payload.get("tipoEquipo");
        
        TipoEquipo tipo = tipoRepo.findByNombre(nombreTipo).orElse(null);

        if (tipo == null) {
            return Response.error(null, "El tipo de equipo '" + nombreTipo + "' no existe");
        }

        Equipo equipo = new Equipo();
        equipo.setCodigo((String) payload.get("codigoEquipo"));
        equipo.setCapacidad((Integer) payload.get("capacidad"));
        equipo.setTipo(tipo); // Vinculación con el objeto real
        
        taller.agregarEquipo(equipo);
        repository.save(taller);

        // Mensaje de respuesta exacto para el test
        return Response.response(HttpStatus.OK, 
            "Taller " + taller.getCodigo() + " actualizado correctamente", 
            taller);
    }
}