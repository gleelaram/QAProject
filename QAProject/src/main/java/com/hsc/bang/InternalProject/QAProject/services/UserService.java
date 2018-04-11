package com.hsc.bang.InternalProject.QAProject.services;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;

public interface UserService {
 
     
    public Users findByUsername(String username);
     
}