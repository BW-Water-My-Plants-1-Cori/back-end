package com.lambdaschool.wmpbackend.models;

import org.springframework.data.domain.AuditorAware;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "plant")
public class Plant extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long plantid;
    
    @Column(nullable = false)
    private String plantname;
    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private String datelastwatered;
    
    @Column(nullable = false)
    private int increment;
    
    @Column(nullable = false)
    private String nextwatering;
    
    @Column(nullable = false)
    private String species;
    
    @Column(nullable = false)
    private String planturl;
    
    @Column(nullable = false)
    private String datecreated;
    
    public Plant()
    {
    }
    
    public Plant(String plantname,
                 String description,
                 String datelastwatered,
                 int increment,
                 String nextwatering,
                 String species,
                 String planturl,
                 String datecreated)
    {
        this.plantname = plantname;
        this.description = description;
        this.datelastwatered = datelastwatered;
        this.increment = increment;
        this.nextwatering = nextwatering;
        this.species = species;
        this.planturl = planturl;
        this.datecreated = datecreated;
    }
    
    public long getPlantid()
    {
        return plantid;
    }
    
    public void setPlantid(long plantid)
    {
        this.plantid = plantid;
    }
    
    public String getPlantname()
    {
        return plantname;
    }
    
    public void setPlantname(String plantname)
    {
        this.plantname = plantname;
    }
    
    public String getDescription()
    {
        return description;
    }
    
    public void setDescription(String description)
    {
        this.description = description;
    }
    
    public String getDatelastwatered()
    {
        return datelastwatered;
    }
    
    public void setDatelastwatered(String datelastwatered)
    {
        this.datelastwatered = datelastwatered;
    }
    
    public int getIncrement()
    {
        return increment;
    }
    
    public void setIncrement(int increment)
    {
        this.increment = increment;
    }
    
    public String getNextwatering()
    {
        return nextwatering;
    }
    
    public void setNextwatering(String nextwatering)
    {
        this.nextwatering = nextwatering;
    }
    
    public String getSpecies()
    {
        return species;
    }
    
    public void setSpecies(String species)
    {
        this.species = species;
    }
    
    public String getPlanturl()
    {
        return planturl;
    }
    
    public void setPlanturl(String planturl)
    {
        this.planturl = planturl;
    }
    
    public String getDatecreated()
    {
        return datecreated;
    }
    
    public void setDatecreated(String datecreated)
    {
        this.datecreated = datecreated;
    }
}
