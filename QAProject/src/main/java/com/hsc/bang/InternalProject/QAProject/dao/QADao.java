package com.hsc.bang.InternalProject.QAProject.dao;

import java.util.List;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;

public interface QADao
{
	public void addQuestion(QA q);
	
	public List<QA> getQuestion();
	
	public Users getUser(String username);
	
	public void addUser(Users user);
	
}