package com.hsc.bang.InternalProject.QAProject.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsc.bang.InternalProject.QAProject.dao.QADao;
import com.hsc.bang.InternalProject.QAProject.dao.Entity.Users;


@Service
public class UserServiceImpl implements UserService
{

	@Autowired
	private QADao qaDao;

	public Users findByUsername(String username) {
		
		Users user = qaDao.getUser(username);
		return user;
	}
	
}
