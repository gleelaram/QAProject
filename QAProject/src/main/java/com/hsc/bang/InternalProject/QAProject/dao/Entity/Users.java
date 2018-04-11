package com.hsc.bang.InternalProject.QAProject.dao.Entity;

import java.util.HashSet;
import java.util.Set;
 
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
 
@Entity
@Table(name="USERS")
public class Users {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="userId", nullable=false)
    private int userIdid;
 
    @Column(name="username", unique=true, nullable=false)
    private String username;
     
    @Column(name="PASSWORD", nullable=false)
    private String password;
         
    @Column(name="STATE", nullable=false)
    private String state=State.ACTIVE.getState();
 
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "APP_USER_USER_PROFILE", 
             joinColumns = { @JoinColumn(name = "userId") }, 
             inverseJoinColumns = { @JoinColumn(name = "user_role_id") })
    
    private Set<UserProfile> userProfiles = new HashSet<UserProfile>();


	public int getUserIdid() {
		return userIdid;
	}

	public void setUserIdid(int userIdid) {
		this.userIdid = userIdid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Set<UserProfile> getUserProfiles() {
		return userProfiles;
	}

	public void setUserProfiles(Set<UserProfile> userProfiles) {
		this.userProfiles = userProfiles;
	}
 
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((state == null) ? 0 : state.hashCode());
		result = prime * result + userIdid;
		result = prime * result + ((userProfiles == null) ? 0 : userProfiles.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Users other = (Users) obj;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (state == null) {
			if (other.state != null)
				return false;
		} else if (!state.equals(other.state))
			return false;
		if (userIdid != other.userIdid)
			return false;
		if (userProfiles == null) {
			if (other.userProfiles != null)
				return false;
		} else if (!userProfiles.equals(other.userProfiles))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Users [userIdid=" + userIdid + ", username=" + username + ", password=" + password + ", state=" + state
				+ ", userProfiles=" + userProfiles + "]";
	}

 
     
}
