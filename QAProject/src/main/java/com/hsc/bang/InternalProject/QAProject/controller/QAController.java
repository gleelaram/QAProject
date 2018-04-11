package com.hsc.bang.InternalProject.QAProject.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;
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
	
@RequestMapping(value="/doLogin",method = RequestMethod.GET)
	
	public @ResponseBody List<QA> doLogin()
	{
		
		List<QA> questions=QAService.getQuestions();
		
		return questions;
		
		
	}

}
