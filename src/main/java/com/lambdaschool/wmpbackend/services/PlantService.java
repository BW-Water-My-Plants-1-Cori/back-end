package com.lambdaschool.wmpbackend.services;

import com.lambdaschool.wmpbackend.models.Plant;

import java.util.List;

public interface PlantService
{
    Plant save(Plant plant);
    
    Plant update(Plant plant, long plantid);
    
    Plant findPlantById(long id);
    
    void delete(long id);
    
    List<Plant>findAll();
    
    
}
