
package com.hsc.bang.InternalProject.QAProject.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hsc.bang.InternalProject.QAProject.dao.Entity.QA;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;

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

public Users getUser(String username) {
	
	Session session = this.sessionFactory.getCurrentSession();
	Criteria cr = session.createCriteria(Users.class);
	cr.add(Restrictions.eq("username", username));
	
	Users user = (Users) cr.uniqueResult();
	
	return user;
}

public void addUser(Users user) {
	
	Session session = this.sessionFactory.getCurrentSession();
	session.save(user);
}

public void deleteQuestion(QA q) {
	Session session = this.sessionFactory.getCurrentSession();
	session.delete(q);
}
	
}