package com.hsc.bang.InternalProject.QAProject.dao.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="QA")
public class QA {
	
 @Id	
 @Column(name="qa_id")
 @GeneratedValue(strategy=GenerationType.IDENTITY)
 private int qa_id;
 
 @Column(name="question")
 private String question;
 @Column(name="skill")
 private String skill;
 @Column(name="subskill")
 private String subskill;
 
 @Column(name="company")
 private String company;

 public int getQa_id() {
	return qa_id;
}
public void setQa_id(int qa_id) {
	this.qa_id = qa_id;
}

public String getQuestion() {
	return question;
}
public void setQuestion(String question) {
	this.question = question;
}
public String getCompany() {
	return company;
}
public void setCompany(String company) {
	this.company = company;
}
public String getSkill() {
	return skill;
}
public void setSkill(String skill) {
	this.skill = skill;
}
public String getSubskill() {
	return subskill;
}
public void setSubskill(String subskill) {
	this.subskill = subskill;
}

@Override
public String toString() {
	return "QA [qa_id=" + qa_id + ", question=" + question + ", skill=" + skill + ", subskill=" + subskill
			+ ", company=" + company + "]";
}

}
