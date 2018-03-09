package com.hsc.bang.InternalProject.QAProject.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;

@Repository
public class QADaoImpl implements QADao
{
	@Autowired
	private SessionFactory sessionFactory;

	public void addQuestion(QA q) {
		
		Session session = this.sessionFactory.getCurrentSession();
		session.persist(q);
		
	}
	
@SuppressWarnings("unchecked")	
public List<QA> getQuestion() {
		
		Session session = this.sessionFactory.getCurrentSession();
		Criteria cr = session.createCriteria(QA.class);
		
		List<QA> QAList=cr.list();
	    return QAList;
		
	}
	
}