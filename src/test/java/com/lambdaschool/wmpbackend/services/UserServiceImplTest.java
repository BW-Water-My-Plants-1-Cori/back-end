package com.lambdaschool.wmpbackend.services;

import com.lambdaschool.wmpbackend.WmpbackendApplication;
import com.lambdaschool.wmpbackend.exceptions.ResourceNotFoundException;
import com.lambdaschool.wmpbackend.models.*;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = WmpbackendApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserServiceImplTest
{
    @Autowired
    private UserService userService;
    
    @Before
    public void setUp() throws
            Exception
    {
        MockitoAnnotations.initMocks(this);
    }
    
    @After
    public void tearDown() throws
            Exception
    {
    }
    
    @Test
    public void a_findUserById()
    {
        assertEquals("admin", userService.findUserById(8)
                .getUsername());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    public void b_findUserByIdNotFound()
    {
        assertEquals("admin", userService.findUserById(10)
                .getUsername());
    }
    
    @Test
    public void c_findAll()
    {
        assertEquals(2, userService.findAll()
                .size());
    }

    @Test
    public void d_findByUsername()
    {
        assertEquals("admin", userService.findByName("admin")
                .getUsername());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    public void e_findByUsernameNotfound()
    {
        assertEquals("admin", userService.findByName("turtle")
                .getUsername());
    }
    
    @Test
    public void f_findByNameContaining()
    {
        assertEquals(1, userService.findByNameContaining("a")
                .size());
    }
    
    @Test
    public void g_delete()
    {
        userService.delete(9);
        assertEquals(1, userService.findAll()
                .size());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    public void h_notFoundDelete()
    {
        userService.delete(100);
        assertEquals(4, userService.findAll()
                .size());
    }
    
    @Test
    public void i_save()
    {
   
        User u2 = new User("TEST",
                "5555555555",
                "TEst@lambdaschool.local",
                "password",
                "User",
                "One",
                1,
                1,
                3);
        User addUser = userService.save(u2);
        assertNotNull(addUser);
    
        User foundUser = userService.findUserById(addUser.getUserid());
        Assert.assertEquals(addUser.getUsername(),foundUser.getUsername());
        

    }
    
    @Transactional
    @WithUserDetails("admin")
    @Test
    public void j_update()
    {
        Role r1 = new Role("admin");
        Role r2 = new Role("user");
        Role r3 = new Role("data");
    
        r2.setRoleid(2);
    
        User u1 = new User("admin",
                "1234567890",
                "admin@lambdaschool.local",
                "password",
                "User",
                "One",
                1,
                1,
                3);
        u1.getRoles()
                .add(new UserRoles(u1, r1));
        u1.getRoles()
                .add(new UserRoles(u1, r2));
        u1.getRoles()
                .add(new UserRoles(u1, r3));
    
    
        User updatedu1 = userService.update(u1, 8);
        
        System.out.println("*** DATA ***");
        System.out.println(updatedu1);
        System.out.println("*** DATA ***");
        

    }
    

}