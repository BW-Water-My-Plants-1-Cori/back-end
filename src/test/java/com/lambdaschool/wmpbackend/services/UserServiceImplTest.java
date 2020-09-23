package com.lambdaschool.wmpbackend.services;

import com.lambdaschool.wmpbackend.WmpbackendApplication;
import com.lambdaschool.wmpbackend.exceptions.ResourceNotFoundException;
import com.lambdaschool.wmpbackend.models.Role;
import com.lambdaschool.wmpbackend.models.User;
import com.lambdaschool.wmpbackend.models.UserRoles;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static junit.framework.TestCase.assertEquals;

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
    public void B_findUserById()
    {
        assertEquals("admin", userService.findUserById(4)
                .getUsername());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    public void BA_findUserByIdNotFound()
    {
        assertEquals("admin", userService.findUserById(10)
                .getUsername());
    }
    
    @Test
    public void C_findAll()
    {
        assertEquals(5, userService.findAll()
                .size());
    }
    
    @Test
    public void D_delete()
    {
        userService.delete(13);
        assertEquals(4, userService.findAll()
                .size());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    public void DA_notFoundDelete()
    {
        userService.delete(100);
        assertEquals(4, userService.findAll()
                .size());
    }
    
    @Test
    public void E_findByUsername()
    {
        assertEquals("admin", userService.findByName("admin")
                .getUsername());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    public void AA_findByUsernameNotfound()
    {
        assertEquals("admin", userService.findByName("turtle")
                .getUsername());
    }
    
    @Test
    public void AB_findByNameContaining()
    {
        assertEquals(4, userService.findByNameContaining("a")
                .size());
    }
    
    @Test
    public void F_save()
    {
        Role r1 = new Role("admin");
        Role r2 = new Role("user");
        Role r3 = new Role("data");
    
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

        User saveU1 = userService.save(u1);
        
        System.out.println("*** DATA ***");
        System.out.println(saveU1);
        System.out.println("*** DATA ***");

    }
    
    @Transactional
    @WithUserDetails("cinnamon")
    @Test
    public void G_update()
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
    
    
        User updatedu1 = userService.update(u1, 7);
        
        System.out.println("*** DATA ***");
        System.out.println(updatedu1);
        System.out.println("*** DATA ***");
        

    }
    
    @Transactional
    @WithUserDetails("cinnamon")
    @Test(expected = ResourceNotFoundException.class)
    public void GB_updateNotCurrentUserNorAdmin()
    {
        Role r1 = new Role("admin");
        Role r2 = new Role("user");
        Role r3 = new Role("data");
    
        // admin, data, user
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
    
    }
}