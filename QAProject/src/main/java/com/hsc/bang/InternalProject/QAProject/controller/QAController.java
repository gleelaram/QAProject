package com.hsc.bang.InternalProject.QAProject.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;
import com.hsc.bang.InternalProject.QAProject.services.QAService;

@Controller
public class QAController {
	
	@Autowired
	private QAService QAService;
	
	@RequestMapping(value="/getQuestions",method = RequestMethod.GET)
	
	public @ResponseBody List<QA> getQuestions()
	{
		
		List<QA> questions=QAService.getQuestions();
		
		return questions;
		
		
	}
	
@RequestMapping(value="/deleteQuestion",method = RequestMethod.POST)
	
	public @ResponseBody List<QA> deleteQuestion(@RequestBody QA q)
	{
	    System.out.println("Delete method");
	     QAService.deleteQuestion(q);
		List<QA> questions=QAService.getQuestions();
		
		return questions;
		
		
	}

@RequestMapping(value="/delSelQues",method = RequestMethod.POST)

public @ResponseBody List<QA> deleteQuestion(@RequestBody List<QA> q)
{
    System.out.println("multi Delete method");
    
    QAService.muldel(q);
	List<QA> questions=QAService.getQuestions();
	
	return questions;
	
	
}
	
	@RequestMapping(value= "/login1",method = RequestMethod.POST)
	
	public @ResponseBody Principal user(Principal user) {
        return user;
    }
	
	@RequestMapping(value= "/addUser",method = RequestMethod.POST)
	
	public @ResponseBody String  addUser(@RequestBody Users user) {
	
	
	
	   System.out.println("entered into controller of USER");
	    QAService.addUser(user);
        return "Added";
    }


	
	
/*	@RequestMapping(value="/addQuestion",method = RequestMethod.POST)
	
	public @ResponseBody List<String> addQuestion(@RequestBody String qA) throws JsonParseException, JsonMappingException, IOException
	{
		ObjectMapper objectMapper = new ObjectMapper();
		QA question=objectMapper.readValue(qA, QA.class);
		System.out.println(question.getQuestion());
		System.out.println("Q value is: "+qA);
		List<String> questions=new ArrayList<String>();
		questions.add("How are you");
		questions.add("what is java?");
		
		return questions;
		
		
	}*/
	
	@RequestMapping(value="/addQuestion",method = RequestMethod.POST,consumes = "application/json")
	public @ResponseBody List<QA> addQuestion(@RequestBody QA q)
	{
		System.out.println("Q value is: "+q);
		
		
		QAService.addQuestions(q);
		List<QA> questions=QAService.getQuestions();
		return questions;
		
		
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.POST)
	public void logoutPage (HttpServletRequest request, HttpServletResponse response,Principal user) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null){    
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	   //You can redirect wherever you want, but generally it's a good practice to show login screen again.
	    response.setStatus(HttpServletResponse.SC_OK);
}
}
	

