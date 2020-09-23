package com.lambdaschool.wmpbackend.services;

import com.lambdaschool.wmpbackend.models.Plant;
import com.lambdaschool.wmpbackend.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "plantService")
public class PlantServiceImpl implements PlantService
{
    @Autowired
    private PlantRepository plantrepo;
    
    @Transactional
    
    @Override
    public Plant save(Plant plant)
    {
        return plantrepo.save(plant);
    }
    
    @Override
    public Plant update(Plant plant, long plantid)
    {
        Plant currentPlant = findPlantById(plantid);
        
        if (plant.getPlantname()!=null)
        {
            currentPlant.setPlantname(plant.getPlantname());
        }
        if (plant.getDescription()!=null)
        {
            currentPlant.setDescription(plant.getDescription());
        }
        if (plant.getDatelastwatered()!=null)
        {
            currentPlant.setDatelastwatered(plant.getDatelastwatered());
        }
        if (plant.getIncrement()!=0)
        {
            currentPlant.setIncrement(plant.getIncrement());
        }
        if (plant.getNextwatering()!=null)
        {
            currentPlant.setNextwatering(plant.getNextwatering());
        }
        if (plant.getSpecies()!=null)
        {
            currentPlant.setSpecies(plant.getSpecies());
        }
        if (plant.getPlanturl()!=null)
        {
            currentPlant.setPlanturl(plant.getPlanturl());
        }
        if (plant.getDatecreated()!=null)
        {
            currentPlant.setDatecreated(plant.getDatecreated());
        }
        
        return plantrepo.save(currentPlant);
    }
    
    @Override
    public Plant findPlantById(long id)
    {
        return plantrepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Plant " + id + " not found!"));
    }
    
    @Override
    public void delete(long id)
    {
        plantrepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Plant " + id + " not found!"));
        plantrepo.deleteById(id);
    }
    
    @Override
    public List<Plant> findAll()
    {
        List<Plant> myList = new ArrayList<>();
        plantrepo.findAll().iterator().forEachRemaining(myList::add);
        return myList;
    }
}
