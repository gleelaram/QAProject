package com.hsc.bang.InternalProject.QAProject.services;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.hsc.bang.InternalProject.QAProject.utils.SecurityUtils;

@Component
public class RestUnauthorizedEntryPoint implements AuthenticationEntryPoint {
 
 public void commence(HttpServletRequest request, HttpServletResponse response,
  AuthenticationException exception) throws IOException, ServletException {
  SecurityUtils.sendError(response, exception, HttpServletResponse.SC_UNAUTHORIZED,
   "Authentication failed");
 }
}
