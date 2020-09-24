package com.lambdaschool.wmpbackend;

//import com.github.javafaker.Faker;
//import com.github.javafaker.service.FakeValuesService;
//import com.github.javafaker.service.RandomService;
import com.lambdaschool.wmpbackend.models.*;
import com.lambdaschool.wmpbackend.services.PlantService;
import com.lambdaschool.wmpbackend.services.RoleService;
import com.lambdaschool.wmpbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * SeedData puts both known and random data into the database. It implements CommandLineRunner.
 * <p>
 * CoomandLineRunner: Spring Boot automatically runs the run method once and only once
 * after the application context has been loaded.
 */
@Transactional
@Component
public class SeedData
        implements CommandLineRunner
{
    /**
     * Connects the Role Service to this process
     */
    @Autowired
    RoleService roleService;

    /**
     * Connects the user service to this process
     */
    @Autowired
    UserService userService;
    
    @Autowired
    PlantService plantService;

    /**
     * Generates test, seed data for our application
     * First a set of known data is seeded into our database.
     * Second a random set of data using Java Faker is seeded into our database.
     * Note this process does not remove data from the database. So if data exists in the database
     * prior to running this process, that data remains in the database.
     *
     * @param args The parameter is required by the parent interface but is not used in this process.
     */
    @Transactional
    @Override
    public void run(String[] args) throws
            Exception
    {
        userService.deleteAll();
        roleService.deleteAll();
        Role r1 = new Role("admin");
        Role r2 = new Role("user");
        Role r3 = new Role("data");
    
        r1 = roleService.save(r1);
        r2 = roleService.save(r2);
        r3 = roleService.save(r3);
    
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
    
        p1 = plantService.save(p1);
        p2 = plantService.save(p2);
        p3 = plantService.save(p3);
        p4 = plantService.save(p4);
    
        // admin, data, user
        User u1 = new User("admin",
                "1234567890",
                "admin@lambdaschool.local",
                "password",
                "Useradmin",
                "Adminuser",
                1,
                1,
                3);
        u1.getRoles().add(new UserRoles(u1, r1));
        u1.getPlants().add(new UserPlants(u1, p1));
        u1.getPlants().add(new UserPlants(u1, p2));
    
        User u2 = new User("user",
                "0987654321",
                "user@lambdaschool.local",
                "password",
                "User",
                "Adminuser",
                1,
                1,
                3);
        u2.getRoles().add(new UserRoles(u2, r2));
        u2.getPlants().add(new UserPlants(u2, p3));
        u2.getPlants().add(new UserPlants(u2, p4));
    
        userService.save(u1);
        userService.save(u2);

//        if (false)
//        {
//            // using JavaFaker create a bunch of regular users
//            // https://www.baeldung.com/java-faker
//            // https://www.baeldung.com/regular-expressions-java
//
//            FakeValuesService fakeValuesService = new FakeValuesService(new Locale("en-US"),
//                                                                        new RandomService());
//            Faker nameFaker = new Faker(new Locale("en-US"));
//
//            for (int i = 0; i < 25; i++)
//            {
//                new User();
//                User fakeUser;
//
//                fakeUser = new User(nameFaker.name()
//                                            .username(),
//                                    "password",
//                                    nameFaker.internet()
//                                            .emailAddress());
//                fakeUser.getRoles()
//                        .add(new UserRoles(fakeUser, r2));
//                fakeUser.getUseremails()
//                        .add(new Plant(fakeUser,
//                                           fakeValuesService.bothify("????##@gmail.com")));
//                userService.save(fakeUser);
//            }
//        }
    }
}