package com.lambdaschool.wmpbackend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lambdaschool.wmpbackend.models.Plant;
import com.lambdaschool.wmpbackend.models.User;
import com.lambdaschool.wmpbackend.services.PlantService;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.h2.table.Plan;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@WithMockUser(username = "admin", roles = {"USER", "ADMIN"})
public class PlantControllerTest
{
    @Autowired
    private WebApplicationContext webApplicationContext;
    
    private MockMvc mockMvc;
    
    @MockBean
    private PlantService plantService;
    
    private List<Plant> plantList;
    
    @Before
    public void setUp() throws Exception
    {
        plantList = new ArrayList<>();
    
        Plant p1 = new Plant("Danny",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
    
        Plant p2 = new Plant("Plant2",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
        Plant p3 = new Plant("Plant3",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
        Plant p4 = new Plant("Plant4",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
    
        plantList.add(p1);
        plantList.add(p2);
        plantList.add(p3);
        plantList.add(p4);
    
        System.out.println("\n*** Seed Data ***");
        for (Plant p : plantList)
        {
            System.out.println(p);
        }
        System.out.println("*** Seed Data ***\n");
    
        RestAssuredMockMvc.webAppContextSetup(webApplicationContext);
    
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }
    
    @After
    public void tearDown() throws Exception
    {
    }
    
    @Test
    public void listPlants() throws Exception
    {
        String apiUrl = "/users/plants";
    
        Mockito.when(plantService.findAll()).thenReturn(plantList);
    
        RequestBuilder rb = MockMvcRequestBuilders.get(apiUrl).accept(MediaType.APPLICATION_JSON);
    
        MvcResult r = mockMvc.perform(rb).andReturn();
        String tr = r.getResponse().getContentAsString();
    
        ObjectMapper mapper = new ObjectMapper();
        String er = mapper.writeValueAsString(plantList);
        
        System.out.println("Expect: " + er);
        System.out.println("Actual: " + tr);
        
        assertEquals("Rest API Returns List", er, tr);
        
        
    }
    
    @Test
    public void updatePlant() throws Exception
    {
        String apiUrl = "/user/plants/{plantid}";
    
        Plant p1 = new Plant("Danny",
                "6ft 2in brown hair with brown eyes",
                "2020922",
                3,
                "2020923",
                "Human",
                "github.com/dhoesle",
                "19961030");
        
        Mockito.when(plantService.update(p1, 100)).thenReturn(plantList.get(0));
        
        ObjectMapper mapper = new ObjectMapper();
        String plantString = mapper.writeValueAsString(p1);
        
        RequestBuilder rb = MockMvcRequestBuilders.put(apiUrl, 100L)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(plantString);
        
        mockMvc.perform(rb).andExpect(status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
    }
    
    @Test
    public void deletePlantById() throws Exception
    {
        String apiUrl = "/plants/user/plant/{plantid}";
    
        RequestBuilder rb = MockMvcRequestBuilders.delete(apiUrl, "6")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);
        mockMvc.perform(rb)
                .andExpect(status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
    }
}