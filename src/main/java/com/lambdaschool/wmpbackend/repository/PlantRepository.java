package com.lambdaschool.wmpbackend.repository;

import com.lambdaschool.wmpbackend.models.Plant;
import org.springframework.data.repository.CrudRepository;

public interface PlantRepository extends CrudRepository<Plant, Long>
{
}
