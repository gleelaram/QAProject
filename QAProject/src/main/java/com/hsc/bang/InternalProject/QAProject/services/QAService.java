package com.hsc.bang.InternalProject.QAProject.services;

import java.util.List;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;


public interface  QAService {
	
	public List<QA> getQuestions();
	public List<String> addQuestions(QA q);
	public void addUser(Users user);
	public void deleteQuestion(QA q);
	public void muldel(List<QA> q);

}
