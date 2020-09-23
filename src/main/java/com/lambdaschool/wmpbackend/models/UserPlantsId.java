package com.lambdaschool.wmpbackend.models;

import java.io.Serializable;

public class UserPlantsId implements Serializable
{
    /**
     * The id of the user
     */
    private long user;
    /**
     * The id of the plant
     */
    private long plants;
    
    public UserPlantsId()
    {
    }
    
    public long getUser()
    {
        return user;
    }
    
    public void setUser(long user)
    {
        this.user = user;
    }
    
    public long getPlants()
    {
        return plants;
    }
    
    public void setPlants(long plants)
    {
        this.plants = plants;
    }
    
    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()){
            return false;
        }
        UserPlantsId that = (UserPlantsId) obj;
        return user == that.user &&
                plants == that.plants;
    }
    
    @Override
    public int hashCode()
    {
        return 37;
    }
}
