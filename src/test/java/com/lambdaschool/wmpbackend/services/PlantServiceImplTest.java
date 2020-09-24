package com.lambdaschool.wmpbackend.services;

import com.lambdaschool.wmpbackend.WmpbackendApplication;
import com.lambdaschool.wmpbackend.models.Plant;
import org.h2.table.Plan;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = WmpbackendApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PlantServiceImplTest
{
    @Autowired
    private UserService userService;
    
    @Autowired
    private PlantService plantService;
    
    @Before
    public void setUp() throws Exception
    {
        MockitoAnnotations.initMocks(this);
    }
    
    @After
    public void tearDown() throws Exception
    {
    }
    
    @Test
    public void e_save()
    {
        Plant p1 = new Plant("TEST",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
        
        Plant addPlant = plantService.save(p1);
        assertNotNull(addPlant);
        
        Plant foundPlant = plantService.findPlantById(addPlant.getPlantid());
        assertEquals(addPlant.getPlantname(), foundPlant.getPlantname());
    }
    
    @Test
    public void c_update()
    {
        Plant p1 = new Plant("TEST",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
    
        Plant updatePlant = plantService.update(p1, 4);
        assertEquals("TEST", updatePlant.getPlantname());
    }
    
    @Test
    public void b_findPlantById()
    {
        assertEquals("Danny", plantService.findPlantById(4).getPlantname());
    
    }
    
    @Test
    public void d_delete()
    {
        plantService.delete(4);
        assertEquals(0, plantService.findAll().size());
    }
    
    @Test
    public void a_findAll()
    {
        assertEquals(1,plantService.findAll().size());
    }
}