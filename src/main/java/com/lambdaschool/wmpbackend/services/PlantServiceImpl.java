package com.lambdaschool.wmpbackend.services;

import com.lambdaschool.wmpbackend.models.Plant;
import com.lambdaschool.wmpbackend.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
