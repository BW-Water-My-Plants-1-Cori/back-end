package com.lambdaschool.wmpbackend.controllers;

import com.lambdaschool.wmpbackend.models.Plant;
import com.lambdaschool.wmpbackend.models.User;
import com.lambdaschool.wmpbackend.models.UserPlants;
import com.lambdaschool.wmpbackend.services.PlantService;
import com.lambdaschool.wmpbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/plants")
public class PlantController
{
    @Autowired
    private UserService userService;
    
    @Autowired
    private PlantService plantService;
    

    
    @PostMapping(value = "/users/plants", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> listPlants(Authentication authentication, @Valid @RequestBody Plant newplant)
    {
        User u = userService.findByName(authentication.getName());
        newplant.setPlantid(0);
        newplant.getUserPlants().add(new UserPlants(u, newplant));
        newplant = plantService.save(newplant);
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }
    
    @PutMapping(value = "/users/plants/{plantid}",
            produces = {"application/json"}, consumes = "application/json")
    public ResponseEntity<?> updatePlant(Authentication authentication,
                                         @Valid
                                         @RequestBody
                                                 Plant updatePlant,
                                         @PathVariable
                                                 long plantid)
    {
        User u = userService.findByName(authentication.getName());
        updatePlant.setPlantid(plantid);
        updatePlant.getUserPlants().add(new UserPlants(u, updatePlant));
        plantService.update(updatePlant, plantid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // working
    // mother is is working
    @DeleteMapping(value = "/user/plant/{plantid}")
    public ResponseEntity<?> deletePlantById( @PathVariable long plantid)
    {
        plantService.delete(plantid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
