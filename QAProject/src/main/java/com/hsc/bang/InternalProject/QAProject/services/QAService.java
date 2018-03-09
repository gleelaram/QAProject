package com.hsc.bang.InternalProject.QAProject.services;

import java.util.List;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;


public interface  QAService {
	
	public List<QA> getQuestions();
	public List<String> addQuestions(QA q);

}
