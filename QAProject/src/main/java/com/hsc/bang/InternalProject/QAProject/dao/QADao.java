package com.hsc.bang.InternalProject.QAProject.dao;

import java.util.List;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;

public interface QADao
{
	public void addQuestion(QA q);
	
	public List<QA> getQuestion();
	
}