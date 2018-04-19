package com.hsc.bang.InternalProject.QAProject.services;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;
import com.hsc.bang.InternalProject.QAProject.utils.SecurityUtils;

@Component
public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
 
 @Autowired
 private UserService userService;
 
 @Override
 public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
	 
  Users user = userService.findByUsername(authentication.getName());
  SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, user);
  
 }
}
