package com.hsc.bang.InternalProject.QAProject.services;


import java.util.ArrayList;
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
 
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.UserProfile;
 
@Service("customUserDetailsService")
public class customUserDetailsService implements UserDetailsService{
 
    @Autowired
    private UserService userService;
     
    @Transactional(readOnly=true)
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        Users user = userService.findByUsername(username);
        System.out.println("User : "+user);
        if(user==null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("Username not found");
        }
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), 
                 user.getEnabled().toString().equals("1"), true, true, true, getGrantedAuthorities(user));
    }
 
     
    private List<GrantedAuthority> getGrantedAuthorities(Users user){
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
         
        for(UserProfile userProfile : user.getUserProfiles()){
            System.out.println("UserProfile : "+userProfile);
            authorities.add(new SimpleGrantedAuthority(userProfile.getRole()));
        }
        System.out.print("authorities :"+authorities);
        return authorities;
    }
     
}