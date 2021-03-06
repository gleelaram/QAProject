package com.hsc.bang.InternalProject.QAProject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hsc.bang.InternalProject.QAProject.dao.QADao;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;
@Service
public class QAServiceImpl implements QAService {
	
	@Autowired
	private QADao qaDao;
	
	
	@Transactional
	public List<QA> getQuestions() {
		
		List<QA> qaList=this.qaDao.getQuestion();
		System.out.println("Entered in the Service Of QA");
		return qaList;
	}
	
	@Transactional
	public List<String> addQuestions(QA q) {
		
		qaDao.addQuestion(q);
		System.out.println("Entered in the ADD Service Of QA");
		return null;
	}

	@Transactional
	public void addUser(Users user) {
		
		qaDao.addUser(user);
		
	}
    
	@Transactional
	public void deleteQuestion(QA q) {
		
		qaDao.deleteQuestion(q);
	}
	
	@Transactional
	public void muldel(List<QA> q) {
		
		for(int i=0;i<q.size();i++)
		{
			qaDao.deleteQuestion(q.get(i));
		}
		
	}

}
